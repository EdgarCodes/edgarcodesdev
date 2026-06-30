package model

import "time"

type Tag struct {
	ID   int 		`json:"id"`
	Name string		`json:"name"`
}

type Post struct {
	ID          string		`json:"id"`
	Slug        string		`json:"slug"`
	Title       string		`json:"title"`
	Excerpt     string		`json:"excerpt"`
	Content     string		`json:"content"`
	CoverImage  string		`json:"cover_image"`
	Status      string		`json:"status"`
	ReadTime    string		`json:"read_time"`
	PublishedAt *time.Time	`json:"published_at"`
	CreatedAt   time.Time	`json:"created_at"`
	UpdatedAt   time.Time 	`json:"updated_at"`
	Tags 		[]Tag		`json:"tags"`
}

type PostSummary struct{
	ID          string		`json:"id"`
	Slug        string		`json:"slug"`
	Title       string		`json:"title"`
	Excerpt     string		`json:"excerpt"`
	CoverImage  string		`json:"cover_image"`
	Status      string		`json:"status"`
	ReadTime    string		`json:"read_time"`
	PublishedAt *time.Time	`json:"published_at"`
	Tags 		[]Tag		`json:"tags"`
}

type PostCreateRequest struct {
	Slug        string		`json:"slug" binding:"required"`
	Title       string		`json:"title" binding:"required"`
	Excerpt     string		`json:"excerpt" binding:"required"`
	Content     string		`json:"content" binding:"required"`
	CoverImage  string		`json:"cover_image" binding:"required"`
	ReadTime    string		`json:"read_time"`
	Tags		[]string    `json:"tags" binding:"required"`
}