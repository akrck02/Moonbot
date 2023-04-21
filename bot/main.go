package main

import (
	"os"

	"github.com/akrck02/moonbot/configuration"
	"github.com/akrck02/moonbot/discord"
)

func main() {

	args := os.Args[1:]
	configuration.LoadArguments(args)

	moonbotTitle()

	if configuration.Args.DISCORD_REGISTER_COMMANDS {
		println("Registering bot commands...")
		discord.Register()
		return
	}

	if configuration.Args.DISCORD_COPILOT_MODE {
		println("Starting bot in copilot mode...")
		return
	}

	if configuration.Args.DISCORD_DELETE_COMMANDS {
		println("Deleting bot commands...")
		discord.Delete()
		return
	}

	discord.Start()
}

func moonbotTitle() {

	println("--------------------------------------------------------------")
	println()
	println("               moonbot - Discord Bot by akrck02               ")
	println()
	println("--------------------------------------------------------------")

}
