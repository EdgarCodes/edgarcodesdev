package utils

import "os"

func GetEnvOrDefault(envName string, defaultValue string) string {
	val := os.Getenv(envName)
	if val == "" {
		return defaultValue
	}

	return val
}