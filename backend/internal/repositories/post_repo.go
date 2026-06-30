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
		       status, read_time, published_at, created_at , updated_at
		FROM posts p
		WHERE id = $1
		LIMIT 1;
	`

	var p model.Post
	err := r.db.QueryRow(ctx, query, postID).Scan(&p.ID, &p.Slug, 
		&p.Title, &p.Excerpt, &p.Content, &p.CoverImage, &p.Status,
		&p.ReadTime, &p.PublishedAt, &p.CreatedAt, &p.UpdatedAt)
	
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil  // not found, no error
		}
		return nil, err
	}

	// Fetch Tags
	tags, err := GetTagsByID(r.db, "posts", ctx, postID)
	if err != nil {
		return nil, err
	}

	for _, t := range tags {
		p.Tags = append(p.Tags, t)
	}

	if p.Tags == nil {
		p.Tags = []model.Tag{}
	}

	return &p, nil
}

func (r *PostRepository) GetAllPostSummaries(ctx context.Context) ([]model.PostSummary, error) {
    query := `SELECT id, slug, title, excerpt, cover_image, status, read_time, published_at FROM posts`
    rows, err := r.db.Query(ctx, query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var posts []model.PostSummary
    var postIDs []string
    for rows.Next() {
  		var p model.PostSummary
			if err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.CoverImage, &p.Status, &p.ReadTime, &p.PublishedAt); err != nil {
					return nil, err
			}
			posts = append(posts, p)
			postIDs = append(postIDs, p.ID)
    }

    if len(posts) == 0 {
        return posts, nil
    }

    // One query for ALL tags across all posts
	tagsByPost, err := GetTagsbyItem(r.db, "posts", ctx, postIDs)
	if err != nil {
		return nil, err
	}

    for i := range posts {
        posts[i].Tags = tagsByPost[posts[i].ID]
		if posts[i].Tags == nil {
			posts[i].Tags = []model.Tag{}
		}
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
		INSERT INTO posts (slug, title, excerpt, content, cover_image, status, read_time) 
		VALUES ($1, $2, $3, $4, $5, 'draft', $6) RETURNING id
	`

	var id string
	err = tx.QueryRow(ctx, query,
		post.Slug,
		post.Title,
		post.Excerpt,
		post.Content,
		post.CoverImage,
		post.ReadTime,
	).Scan(&id)

	if err != nil {
		return "", err
	}

	// If tag does not exist create it
	existingTags, err := CreateTags(tx, ctx, post.Tags)
	if err != nil {
		return "", err
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