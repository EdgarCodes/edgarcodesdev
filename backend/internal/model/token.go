package model

import "time"

type Token struct {
	TokenID   int         `json:"token_id"`
	Token     string      `json:"token"`
	ExpiresAt time.Time   `json:"expires_at"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}