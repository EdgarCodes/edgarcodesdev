package repositories

import (
	"backend/internal/model"
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProjectRepository struct {
	db *pgxpool.Pool
}

func NewProjectRepository(db *pgxpool.Pool) *ProjectRepository {
	return &ProjectRepository{db: db}
}

func (r *ProjectRepository) GetAllProjects(ctx context.Context) ([]model.Project, error){
	query := `
		SELECT id, title, excerpt, preview_image, github_url, post_url, created_at, updated_at
		FROM projects
	`
	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []model.Project
	for rows.Next() {
		var p model.Project
		if err := rows.Scan(
			&p.ID, &p.Title, &p.Excerpt, 
			&p.PreviewImage, &p.GithubURL, 
			&p.PostURL, &p.CreatedAt, 
			&p.UpdatedAt); err != nil {
			return nil, err
		}

		projects = append(projects, p)
	}

	return projects, nil
}

func (r *ProjectRepository) GetProjectByID(ctx context.Context, projectID string) (*model.Project, error) {
	query := `
		SELECT id, title, excerpt, preview_image, github_url, post_url, created_at, updated_at
		FROM projects
		WHERE id = $1
	`

	var project model.Project
	err := r.db.QueryRow(ctx, query, projectID).Scan(
		&project.ID,
		&project.Title,
		&project.Excerpt,
		&project.PreviewImage,
		&project.GithubURL,
		&project.PostURL,
		&project.CreatedAt,
		&project.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil  // not found, no error
		}
		return nil, err
	}

	return &project, nil
}

func (r *ProjectRepository) CreateProject(ctx context.Context, project model.ProjectCreateRequest) (string, error) {
	query := `
		INSERT INTO projects (title, excerpt, preview_image, github_url, post_url) 
		VALUES ($1, $2, $3, $4, $5) RETURNING id`
	

	var id string
	err := r.db.QueryRow(ctx, query,
		project.Title,
		project.Excerpt,
		project.PreviewImage,
		project.GithubURL,
		project.PostURL,
	).Scan(&id)
	
	if err != nil {
		return "", err
	}

	return id, nil
}