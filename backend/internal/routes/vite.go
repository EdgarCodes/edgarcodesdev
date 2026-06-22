package routes

import (
	"net/http/httputil"
	"net/url"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func ServeIndex(r *gin.Engine, distDir string) {
	r.Static("/assets", filepath.Join(distDir, "assets"))
	r.StaticFile("/favicon.svg", filepath.Join(distDir, "favicon.svg"))

	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path

		if strings.HasPrefix(path, "/api/") ||
			strings.HasPrefix(path, "/swagger/") {
			c.JSON(404, gin.H{"error": "Page not found"})
			return
		}
		c.File(filepath.Join(distDir, "index.html"))
	})
}

func ServeIndexDev(r *gin.Engine) {
	vite, _ := url.Parse("http://localhost:5173")
	proxy := httputil.NewSingleHostReverseProxy(vite)

	// Send all non-/api traffic to Vite
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path

		if strings.HasPrefix(path, "/api/") ||
			strings.HasPrefix(path, "/assets/") ||
			strings.HasPrefix(path, "/swagger/") ||
			path == "/favicon.icon" {
				c.JSON(404, gin.H {"error": "Page not found"})
				return
		}
		proxy.ServeHTTP(c.Writer, c.Request)
	})
}