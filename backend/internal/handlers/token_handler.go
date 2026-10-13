package handlers

import (
	"backend/internal/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TokenHandler struct {
	tokenRepo *repositories.TokenRepository
}

func NewTokenHandler(tokenRepo *repositories.TokenRepository) *TokenHandler {
	return &TokenHandler{
		tokenRepo: tokenRepo,
	}
}

// GetProjects godoc
// @Summary      Create API token
// @Description  Creates API token
// @Tags         tokens
// @Produce      json
// @Success      200  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Security     API-Key
// @Router       /token [post]
func (h *TokenHandler) CreateToken(c *gin.Context) {
	token, err := h.tokenRepo.InsertNewToken(c.Request.Context())
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error occured retrieving projects: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}