package discord

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/akrck02/moonbot/configuration"
	"github.com/bwmarrin/discordgo"
)

func Start() {
	discord := createDiscordSession()
	discord.AddHandler(ready)
	addDiscordIntents(discord)
	openDiscordSession(discord)
	closeDiscordSession(discord, true)

}

func Register() {
	discord := createDiscordSession()
	addDiscordIntents(discord)
	openDiscordSession(discord)
	RegisterCommands(discord)
	closeDiscordSession(discord, false)
}

func Delete() {
	discord := createDiscordSession()
	addDiscordIntents(discord)
	openDiscordSession(discord)
	DeleteCommands(discord)
	closeDiscordSession(discord, false)
}

func ready(s *discordgo.Session, event *discordgo.Ready) {

	// Set the playing status.
	s.UpdateGameStatus(0, "Developing myself with Go!")
	SetCommands(s)

}

func createDiscordSession() *discordgo.Session {
	discord, err := discordgo.New("Bot " + configuration.Params.DISCORD_BOT_TOKEN)
	if err != nil {
		panic(err)
	}

	return discord
}

func addDiscordIntents(discord *discordgo.Session) {
	discord.Identify.Intents = discordgo.IntentsGuilds | discordgo.IntentsGuildMessages | discordgo.IntentsGuildVoiceStates
}

func openDiscordSession(discord *discordgo.Session) {
	err := discord.Open()
	if err != nil {
		fmt.Println("Error opening Discord session: ", err)
	}
}

func closeDiscordSession(discord *discordgo.Session, mantain bool) {

	if mantain {
		// Wait here until CTRL-C or other term signal is received.
		fmt.Println("Moonbot is now running.  Press CTRL-C to exit.")
		sc := make(chan os.Signal, 1)
		signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
		<-sc
	}
	discord.Close()
}
