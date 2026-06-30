package repositories

import (
	"backend/internal/model"
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Helper Tag Functions

func GetTagsByID(db *pgxpool.Pool, table string, ctx context.Context, ID string) ([]model.Tag, error) {
	// Internal function to set tags for project objects
	tagsQuery := `
	SELECT t.id, t.name 
	FROM tags t
	JOIN project_tags pt ON pt.tag_id = t.id
	WHERE pt.project_id = $1
	`

	if table == "posts" {
		tagsQuery = `
		SELECT t.id, t.name 
		FROM tags t
		JOIN post_tags pt ON pt.tag_id = t.id
		WHERE pt.post_id = $1
		`
	}

	rows, err := db.Query(ctx, tagsQuery, ID)
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

func GetTagsbyItem(db *pgxpool.Pool, table string, ctx context.Context, IDs []string) (map[string][]model.Tag, error)  {
    // One query for ALL tags across all posts
    tagsQuery := `
        SELECT pt.project_id, t.id, t.name
        FROM tags t
        JOIN project_tags pt ON pt.tag_id = t.id
        WHERE pt.project_id = ANY($1)
    `
	if table == "posts" {
		tagsQuery = `
        SELECT pt.post_id, t.id, t.name
        FROM tags t
        JOIN post_tags pt ON pt.tag_id = t.id
        WHERE pt.post_id = ANY($1)
		`
	}
	
    tagRows, err := db.Query(ctx, tagsQuery, IDs)
    if err != nil {
        return nil, err
    }
    defer tagRows.Close()

    tagsByItem := make(map[string][]model.Tag)
    for tagRows.Next() {
        var ID string
        var tag model.Tag
        if err := tagRows.Scan(&ID, &tag.ID, &tag.Name); err != nil {
            return nil, err
        }
        tagsByItem[ID] = append(tagsByItem[ID], tag)
    }

	return tagsByItem, nil
}

func CreateTags(tx pgx.Tx, ctx context.Context, tags []string) (map[string]int, error) {
	tagsQuery := `
		SELECT id, name FROM tags WHERE name = ANY($1)  
	`
	rows, err := tx.Query(ctx, tagsQuery, tags); 
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	existingTags := make(map[string]int)
	for rows.Next() {
		var tag model.Tag
		if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
			return nil, err
		}
		existingTags[tag.Name] = tag.ID
	}

	for _, t := range tags {
		if _, exists := existingTags[t]; !exists {
			// Create new tag
			insertTagQuery := `INSERT INTO tags (name) VALUES ($1) RETURNING id`
			var tagID int
			if err = tx.QueryRow(ctx, insertTagQuery, t).Scan(&tagID); err != nil {
				return nil, err 
			}

			existingTags[t] = tagID
		}
	}

	return existingTags, nil
}