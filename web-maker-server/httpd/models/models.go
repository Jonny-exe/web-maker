package models


type TokenAndRecovery_key struct {
	Token string `json:"token"`
	Recovery_key string `json:"recovery_key"`
}

type TokenAndObject struct {
	Token string `json:"token"`
	Object string `json:"object`
}

type Recovery_key struct {
	Recovery_key string `json:"recovery_key"`
}