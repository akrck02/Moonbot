package configuration

import (
	"log"
	"os"
	"path/filepath"
	"runtime"

	"github.com/joho/godotenv"
)

type GlobalConfiguration struct {
	DISCORD_BOT_TOKEN string
	CAT_API_TOKEN     string
}

var (
	_, b, _, _ = runtime.Caller(0)
	BASE_PATH  = filepath.Dir(b) + "/../"
)

var Params GlobalConfiguration = LoadConfiguration()

func LoadConfiguration() GlobalConfiguration {
	err := godotenv.Load(BASE_PATH + ".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	var configuration = GlobalConfiguration{
		DISCORD_BOT_TOKEN: os.Getenv("DISCORD_BOT_TOKEN"),
		CAT_API_TOKEN:     os.Getenv("CAT_API_TOKEN"),
	}

	checkCompulsoryVariables(configuration)
	return configuration
}

func checkCompulsoryVariables(Configuration GlobalConfiguration) {

}
