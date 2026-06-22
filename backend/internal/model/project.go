package model

import "time"

type Project struct {
	ID           string      `json:"id"`
	Title        string      `json:"title"`
	Excerpt      string      `json:"excerpt"`
	PreviewImage string      `json:"preview_image"`
	GithubURL    string      `json:"github_url"`
	PostURL      string      `json:"post_url"`
	CreatedAt    time.Time 	 `json:"created_at"`
	UpdatedAt    time.Time   `json:"updated_at"`
}

type ProjectCreateRequest struct {
	Title        string `json:"title" binding:"required"`
	Excerpt      string `json:"excerpt" binding:"required"`
	PreviewImage string `json:"preview_image" binding:"required"`
	GithubURL    string `json:"github_url" binding:"required"`
	PostURL      string `json:"post_url"`
}