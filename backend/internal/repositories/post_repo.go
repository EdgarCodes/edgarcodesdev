package repositories

import (
	"backend/internal/model"
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PostRepository struct {
	db *pgxpool.Pool
}

func NewPostRepository(db *pgxpool.Pool) *PostRepository {
	return &PostRepository{db: db}
}

func (r *PostRepository) GetPostByID(ctx context.Context, postID string) (*model.Post, error) {
	// Get Post
	query := `
		SELECT id, slug, title, excerpt, content, cover_image,
		       status, published_at, created_at , updated_at
		FROM posts p
		WHERE id = $1
		LIMIT 1;
	`

	var p model.Post
	err := r.db.QueryRow(ctx, query, postID).Scan(&p.ID, &p.Slug, 
		&p.Title, &p.Excerpt, &p.Content, &p.CoverImage, &p.Status,
		&p.PublishedAt, &p.CreatedAt, &p.UpdatedAt)
	
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil  // not found, no error
		}
		return nil, err
	}

	// Fetch Tags
	tags, err := r.GetTagsByPostID(ctx, postID)
	if err != nil {
		return nil, err
	}

	for _, t := range tags {
		p.Tags = append(p.Tags, t)
	}

	return &p, nil
}

func (r *PostRepository) GetAllPostSummaries(ctx context.Context) ([]model.PostSummary, error) {
    query := `SELECT id, slug, title, excerpt, cover_image, status, published_at FROM posts`
    rows, err := r.db.Query(ctx, query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var posts []model.PostSummary
    var postIDs []string
    for rows.Next() {
        var p model.PostSummary
        if err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.CoverImage, &p.Status, &p.PublishedAt); err != nil {
            return nil, err
        }
        posts = append(posts, p)
        postIDs = append(postIDs, p.ID)
    }

    if len(posts) == 0 {
        return posts, nil
    }

    // One query for ALL tags across all posts
    tagsQuery := `
        SELECT pt.post_id, t.id, t.name
        FROM tags t
        JOIN post_tags pt ON pt.tag_id = t.id
        WHERE pt.post_id = ANY($1)
    `
    tagRows, err := r.db.Query(ctx, tagsQuery, postIDs)
    if err != nil {
        return nil, err
    }
    defer tagRows.Close()

    tagsByPost := make(map[string][]model.Tag)
    for tagRows.Next() {
        var postID string
        var tag model.Tag
        if err := tagRows.Scan(&postID, &tag.ID, &tag.Name); err != nil {
            return nil, err
        }
        tagsByPost[postID] = append(tagsByPost[postID], tag)
    }

    for i := range posts {
        posts[i].Tags = tagsByPost[posts[i].ID]
    }

    return posts, nil
}

func (r *PostRepository) CreatePost(ctx context.Context, post model.PostCreateRequest) (string, error) { 
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return "", err
	}
	defer tx.Rollback(ctx)

	query := `
		INSERT INTO posts (slug, title, excerpt, content, cover_image, status) 
		VALUES ($1, $2, $3, $4, $5, 'draft') RETURNING id
	`

	var id string
	err = tx.QueryRow(ctx, query,
		post.Slug,
		post.Title,
		post.Excerpt,
		post.Content,
		post.CoverImage,
	).Scan(&id)

	if err != nil {
		return "", err
	}

	// If tag does not exist create it
	tagsQuery := `
		SELECT id, name FROM tags WHERE name = ANY($1)  
	`
	rows, err := tx.Query(ctx, tagsQuery, post.Tags); 
	if err != nil {
		return "", err
	}
	defer rows.Close()

	existingTags := make(map[string]int)
	for rows.Next() {
		var tag model.Tag
		if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
			return "", err
		}
		existingTags[tag.Name] = tag.ID
	}

	for _, t := range post.Tags {
		if _, exists := existingTags[t]; !exists {
			// Create new tag
			insertTagQuery := `INSERT INTO tags (name) VALUES ($1) RETURNING id`
			var tagID int
			if err = tx.QueryRow(ctx, insertTagQuery, t).Scan(&tagID); err != nil {
				return "", err 
			}

			existingTags[t] = tagID
		}
	}

	for _, v := range existingTags {
		// Create new post tag
		insertPostTagQuery := `INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)`
		_, err = tx.Exec(ctx, insertPostTagQuery, id, v)
		if err != nil {
			return "", err
		}
	}

	return id, tx.Commit(ctx)
}


func (r *PostRepository) GetTagsByPostID(ctx context.Context, postID string) ([]model.Tag, error) {
	// Internal function to set tags for post objects
	tagsQuery := `
	SELECT t.id, t.name 
	FROM tags t
	JOIN post_tags pt ON pt.tag_id = t.id
	WHERE pt.post_id = $1
	`

	rows, err := r.db.Query(ctx, tagsQuery, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tags []model.Tag
	for rows.Next() {
		var tag model.Tag
		if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
			return nil, err
		}
		tags = append(tags, tag)
	}
	return tags, nil
}