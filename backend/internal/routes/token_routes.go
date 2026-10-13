package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"backend/internal/repositories"

	"github.com/gin-gonic/gin"
)

func RegisterTokenRoutes(rg *gin.RouterGroup, h *handlers.TokenHandler, r *repositories.TokenRepository) {
	rg.POST("/token", middleware.AuthRequired(r), h.CreateToken)
}