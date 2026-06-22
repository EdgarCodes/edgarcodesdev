package routes

import (
	"backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterPostRoutes(rg *gin.RouterGroup, h *handlers.PostHandler) {
	rg.GET("/post/:post_id", h.GetPostsByID)
	rg.GET("/posts", h.GetAllPostSummaries)
	rg.POST("/post", h.CreatePost)
}