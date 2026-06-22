package handlers

import (
	"backend/internal/model"
	"backend/internal/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostHandler struct {
	postRepo *repositories.PostRepository
}

func NewPostHandler(postRepo *repositories.PostRepository) *PostHandler {
	return &PostHandler{postRepo: postRepo}
}

// GetPostsByID godoc
// @Summary      Get post by ID
// @Description  Retrieves a single post by its ID
// @Tags         posts
// @Produce      json
// @Param        post_id  path      string         true  "Post ID"
// @Success      200      {object}  model.Post
// @Failure      400      {object}  map[string]string
// @Failure      404      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Router       /posts/{post_id} [get]
func (h *PostHandler)GetPostsByID(c *gin.Context) {
	postID := c.Param("post_id")
	if postID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "post_id path param is required"})
		return
	}

	post, err := h.postRepo.GetPostByID(c.Request.Context(), postID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Issue occured retrieving post " + err.Error()})
		return
	}

	if post == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post with postID: " + postID + " not found."})
		return
	}

	c.JSON(http.StatusOK, post)
}


// GetAllPostSummaries godoc
// @Summary      Get all post summaries
// @Description  Retrieves a list of all post summaries
// @Tags         posts
// @Produce      json
// @Success      200  {array}   model.PostSummary
// @Failure      500  {object}  map[string]string
// @Router       /posts [get]
func (h *PostHandler)GetAllPostSummaries(c *gin.Context) {
	posts, err := h.postRepo.GetAllPostSummaries(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Issue occured retrieving posts " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, posts)
}

// CreatePost godoc
// @Summary      Create a post
// @Description  Creates a new post
// @Tags         posts
// @Accept       json
// @Produce      json
// @Param        body  body      model.PostCreateRequest  true  "Post payload"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Router       /post [post]
func (h *PostHandler)CreatePost(c *gin.Context) {
	var req model.PostCreateRequest
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := h.postRepo.CreatePost(c.Request.Context(), req)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	c.JSON(http.StatusOK, gin.H{"id": id})
}
