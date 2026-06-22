package routes

import (
	"backend/internal/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterProjectRoutes(rg *gin.RouterGroup, h *handlers.ProjectHandler) {
	rg.GET("/project/:project_id", h.GetProjectByID)
	rg.GET("/projects", h.GetProjects)
	rg.POST("/project", h.CreateProject)
}