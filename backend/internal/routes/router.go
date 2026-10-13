package routes

import (
	"backend/internal/handlers"
	"backend/internal/repositories"
	"backend/internal/utils"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func SetupRouter(db *pgxpool.Pool) *gin.Engine {
	r := gin.Default()

	// Set CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string {"http://127.0.0.1:5000", "http://localhost:5000", "http://localhost:5173", "http://127.0.0.1:5173"}
	config.AddAllowHeaders("X-API-Key")
	r.Use(cors.New(config))

	// Get current env
	stage := utils.GetEnvOrDefault("APPSTAGE", "DEV")

	// Set Groups
	apiGroup := r.Group("/api")

	// Repositories
	postRepo := repositories.NewPostRepository(db)
	projectRepo := repositories.NewProjectRepository(db)
	tokenRepo := repositories.NewTokenRepository(db)


	// Handlers
	postHandler := handlers.NewPostHandler(postRepo)
	projectHandler := handlers.NewProjectHandler(projectRepo)
	tokenHandler := handlers.NewTokenHandler(tokenRepo)

	// Routes
	RegisterPostRoutes(apiGroup, postHandler, tokenRepo)
	RegisterTokenRoutes(apiGroup, tokenHandler, tokenRepo)
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