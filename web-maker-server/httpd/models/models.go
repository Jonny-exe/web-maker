package models

// TokenAndRecovery_key ...
type TokenAndRecovery_key struct {
	Token        string `json:"token"`
	Recovery_key string `json:"recovery_key"`
}

// TokenAndObject ..
type TokenAndObject struct {
	Token  string      `json:"token"`
	Object interface{} `json:"object"`
}

// Recovery_key ...
type Recovery_key struct {
	Recovery_key string `json:"recovery_key"`
}

// Token ...
type Token struct {
	Token string `json:"token"`
}

// Content ...
type Content []ContentItem

// ContentItem ...
type ContentItem struct {
	Type     string        `json:"type"`
	Text     string        `json:"text"`
	Content  string        `json:"content"`
	Style    interface{}   `json:"style"`
	Children []ContentItem `json:"children"`
}
