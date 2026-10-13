package utils

import (
	"bytes"
	"io"
	"os"

	"github.com/alecthomas/chroma/v3"
	chromahtml "github.com/alecthomas/chroma/v3/formatters/html"
	"github.com/alecthomas/chroma/v3/lexers"
	"github.com/alecthomas/chroma/v3/styles"
	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/ast"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

func GetEnvOrDefault(envName string, defaultValue string) string {
	val := os.Getenv(envName)
	if val == "" {
		return defaultValue
	}

	return val
}

var (
	chromaStyle     = styles.Get("github-dark")
	chromaFormatter = chromahtml.New(
		chromahtml.WithClasses(true),
		chromahtml.WithLineNumbers(false),
		chromahtml.TabWidth(4),
	)
)

func highlight(w io.Writer, source, lang string) error {
	lexer := lexers.Get(lang)
	if lexer == nil {
		lexer = lexers.Analyse(source)
	}
	if lexer == nil {
		lexer = lexers.Fallback
	}
	iterator, err := chroma.Coalesce(lexer).Tokenise(nil, source)
	if err != nil {
		return err
	}
	return chromaFormatter.Format(w, chromaStyle, iterator)
}

func codeBlockHook(w io.Writer, node ast.Node, entering bool) (ast.WalkStatus, bool) {
    code, ok := node.(*ast.CodeBlock)
    if !ok {
        return ast.GoToNext, false
    }

    // Info is the fence string, e.g. "go" in ```go
    lang, _, _ := bytes.Cut(code.Info, []byte(" "))
    if err := highlight(w, string(code.Literal), string(lang)); err != nil {
        return ast.GoToNext, false // fall back to the default renderer
    }
    return ast.GoToNext, true
}

func ConvertToHtml(mds string) string{
	// Markdown parser
	extension := parser.CommonExtensions | parser.AutoHeadingIDs | parser.NoEmptyLineBeforeBlock
	p := parser.NewWithExtensions(extension)
	doc := p.Parse([]byte(mds))

	// create HTML renderer
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags, RenderNodeHook: codeBlockHook}
	renderer := html.NewRenderer(opts)

	return string(markdown.Render(doc, renderer))
}
