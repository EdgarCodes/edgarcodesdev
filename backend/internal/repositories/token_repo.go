package repositories

import (
	"backend/internal/services/security"
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

type TokenRepository struct {
	db *pgxpool.Pool
}

func NewTokenRepository(db *pgxpool.Pool) *TokenRepository {
	return &TokenRepository{db: db}
}

func (r *TokenRepository) GetTokenValid(token string, ctx context.Context) (bool, error) {
	const query = `SELECT token_id FROM tokens WHERE token = $1 AND expires_at > now()`

	var token_id string
	if err := r.db.QueryRow(ctx, query, security.HashToken(token)).Scan(&token_id); err != nil {
		return false, errors.New("Token is invalid or has expired.")
	}
	return true, nil
}

func (r *TokenRepository) InsertNewToken(ctx context.Context) (string, error) {
	token, hashedToken, err := security.NewToken()
	if err != nil {
		return "", err
	}

	const query = `INSERT INTO tokens (token) VALUES ($1)`

	if _, err := r.db.Exec(ctx, query, string(hashedToken)); err != nil {
		msg := fmt.Sprintf("Failed to insert new token. Error: %s", err.Error())
		return "", errors.New(msg)
	}
	
	return token, nil
}