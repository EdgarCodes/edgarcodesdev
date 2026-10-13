package middleware

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/repositories"
)

func AuthRequired(r *repositories.TokenRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("X-API-Key");

		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "X-API-Key is required in headers."})
			return
		}

		isValid, err := r.GetTokenValid(token, c.Request.Context())
		if err != nil {
			msg := fmt.Sprintf("Issue occured validating token. Err: %s", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": msg })
			return
		}

		if !isValid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Provided X-API-Key token is not valid."})
			return
		}

		// Token is valid
		c.Next()
	}
}