// @title			EdgarCodesAPI
// @version			1.0
// @description 	EdgarCodes Backend serves personal website files and utilities
// @host      		127.0.0.1:5000
// @BasePath		/api

package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	"backend/internal/utils"
	"context"
	"log/slog"
	"os"

	_ "backend/docs"
)

var PORT = utils.GetEnvOrDefault("PORT", "5000")

func main() {
	// Setup Database
	connString := os.Getenv("DBCONNECTION")
	if connString == "" {
		slog.Error("connection string empty, exiting program...")
		os.Exit(1)
	}

	db, err := database.Connect(context.Background(), connString)
	if err != nil {
		slog.Error("issue occured connecting to database:", "error", err.Error())
		os.Exit(1)
	}
	defer db.Close()

	// Setup Routes
	r := routes.SetupRouter(db);


	if err := r.Run("0.0.0.0:" + PORT); err != nil {
		panic(err)
	}
}