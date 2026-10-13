package routes

import (
	"backend/internal/handlers"
	"backend/internal/middleware"
	"backend/internal/repositories"

	"github.com/gin-gonic/gin"
)

func RegisterPostRoutes(rg *gin.RouterGroup, h *handlers.PostHandler, r *repositories.TokenRepository) {
	rg.GET("/post/slug/:post_slug", h.GetPostsBySlug)
	rg.GET("/post/:post_id", h.GetPostsByID)
	rg.GET("/posts", h.GetAllPostSummaries)
	rg.POST("/post", middleware.AuthRequired(r), h.CreatePost)
	rg.POST("/post/release/:post_id", middleware.AuthRequired(r), h.ReleasePost)
	rg.POST("/post/draft/:post_id", middleware.AuthRequired(r), h.DraftPost)
}