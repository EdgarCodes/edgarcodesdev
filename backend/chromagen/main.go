package main

import (
	"os"

	chromahtml "github.com/alecthomas/chroma/v3/formatters/html"
	"github.com/alecthomas/chroma/v3/styles"
)

func main() {
	// Used to generate CSS for code blocks on blog
	f := chromahtml.New(
		chromahtml.WithClasses(true),
		chromahtml.WithLineNumbers(false),
		chromahtml.TabWidth(4),
	)
	if err := f.WriteCSS(os.Stdout, styles.Get("github-dark")); err != nil {
		panic(err)
	}
}
