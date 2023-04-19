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
	dg, err := discordgo.New("Bot " + configuration.Params.DISCORD_BOT_TOKEN)
	if err != nil {
		panic(err)
	}

	dg.AddHandler(ready)

	// We need information about guilds (which includes their channels),
	// messages and voice states.
	dg.Identify.Intents = discordgo.IntentsGuilds | discordgo.IntentsGuildMessages | discordgo.IntentsGuildVoiceStates

	// Open the websocket and begin listening.
	err = dg.Open()
	if err != nil {
		fmt.Println("Error opening Discord session: ", err)
	}

	// Wait here until CTRL-C or other term signal is received.
	fmt.Println("Moonbot is now running.  Press CTRL-C to exit.")
	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc

	// Cleanly close down the Discord session.
	dg.Close()

}

func ready(s *discordgo.Session, event *discordgo.Ready) {

	// Set the playing status.
	s.UpdateGameStatus(0, "Developing myself with Go!")
	RegisterCommands(s)
	SetCommands(s)
}
