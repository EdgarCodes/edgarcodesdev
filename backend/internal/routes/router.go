package routes

import (
	"backend/internal/handlers"
	"backend/internal/repositories"
	"backend/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRouter(db *pgxpool.Pool) *gin.Engine {
	r := gin.Default()

	// Get current env
	stage := utils.GetEnvOrDefault("APPSTAGE", "DEV")

	// Set Groups
	apiGroup := r.Group("/api")

	// Repositories
	postRepo := repositories.NewPostRepository(db)
	projectRepo := repositories.NewProjectRepository(db)

	// Handlers
	postHandler := handlers.NewPostHandler(postRepo)
	projectHandler := handlers.NewProjectHandler(projectRepo)

	// Routes
	RegisterPostRoutes(apiGroup, postHandler)
	RegisterProjectRoutes(apiGroup, projectHandler)

	if stage == "DEV"{
		ServeIndexDev(r)
	} else {
		ServeIndex(r, "/app/dist")
	}

	// Setup Swagger
	apiGroup.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Health Endpoint
	apiGroup.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "healthy"})
	})

	return r
}