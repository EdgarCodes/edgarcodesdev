package handlers

import (
	"backend/internal/model"
	"backend/internal/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProjectHandler struct {
	projectRepo *repositories.ProjectRepository
}

func NewProjectHandler(projectRepo *repositories.ProjectRepository) *ProjectHandler {
	return &ProjectHandler{
		projectRepo: projectRepo,
	}
}

// GetProjects godoc
// @Summary      Get all projects
// @Description  Retrieves a list of all projects
// @Tags         projects
// @Produce      json
// @Success      200  {array}   model.Project
// @Failure      500  {object}  map[string]string
// @Router       /projects [get]
func (h *ProjectHandler) GetProjects(c *gin.Context) {
	projects, err := h.projectRepo.GetAllProjects(c.Request.Context())
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error occured retrieving projects: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, projects)
}


// GetProjectByID godoc
// @Summary      Get project by ID
// @Description  Retrieves a single project by its ID
// @Tags         projects
// @Produce      json
// @Param        project_id  path      string  true  "Project ID"
// @Success      200         {object}  model.Project
// @Failure      400         {object}  map[string]string
// @Failure      404         {object}  map[string]string
// @Failure      500         {object}  map[string]string
// @Router       /project/{project_id} [get]
func (h *ProjectHandler) GetProjectByID(c *gin.Context) {
	projectID := c.Param("project_id")
	if projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "project_id path param is required"})
		return
	}

	project, err := h.projectRepo.GetProjectByID(c.Request.Context(), projectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Issue occured retrieving project " + err.Error()})
		return
	}

	if project == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project with projectID: " + projectID + " not found."})
		return
	}

	c.JSON(http.StatusOK, project)
}

// CreateProject godoc
// @Summary      Create a project
// @Description  Creates a new project
// @Tags         projects
// @Accept       json
// @Produce      json
// @Param        body  body      model.ProjectCreateRequest  true  "Project payload"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /project [post]
func (h *ProjectHandler) CreateProject(c *gin.Context) {
	var projectRequest model.ProjectCreateRequest
	if err := c.ShouldBindBodyWithJSON(&projectRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	projectID, err := h.projectRepo.CreateProject(c.Request.Context(), projectRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Issue creating project " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": projectID})
}