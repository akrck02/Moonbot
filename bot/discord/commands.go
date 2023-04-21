package discord

import (
	"log"

	"github.com/bwmarrin/discordgo"
)

var (
	integerOptionMinValue          = 1.0
	dmPermission                   = false
	defaultMemberPermissions int64 = discordgo.PermissionManageServer

	commands = []*discordgo.ApplicationCommand{
		{Name: "ping", Description: "Replies with pong!"},
		{Name: "cat", Description: "Replies with a random cat image!"},
		{Name: "random", Description: "Get a random number between limits", Options: []*discordgo.ApplicationCommandOption{
			{
				Type:        discordgo.ApplicationCommandOptionInteger,
				Name:        "min",
				Description: "Minimum value",
				Required:    true,
				Choices: []*discordgo.ApplicationCommandOptionChoice{
					{Name: "1", Value: &integerOptionMinValue},
				},
			},
			{
				Type:        discordgo.ApplicationCommandOptionInteger,
				Name:        "max",
				Description: "Maximum value",
				Required:    true,
			},
			{
				Type:        discordgo.ApplicationCommandOptionBoolean,
				Name:        "digits",
				Description: "Show digits",
				Required:    false,
			},
		}},
		{Name: "poll", Description: "Create a poll",
			Options: []*discordgo.ApplicationCommandOption{
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        "question",
					Description: "Question",
					Required:    true,
				},
				{
					Type:        discordgo.ApplicationCommandOptionString,
					Name:        "options",
					Description: "Options separated by comma",
					Required:    true,
				},
			},
		},
		{Name: "play", Description: "Play music"},
		{Name: "stop", Description: "Stop music"},
		{Name: "skip", Description: "Skip music"},
		{Name: "queue", Description: "Show queue"},
		{Name: "clear-queue", Description: "Clear queue"},

		{Name: "help", Description: "Show help"},
	}

	commandHandlers = map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate){
		"ping":        PingCommand,
		"cat":         CatCommand,
		"random":      NotImplementedCommand,
		"poll":        NotImplementedCommand,
		"play":        NotImplementedCommand,
		"stop":        NotImplementedCommand,
		"skip":        NotImplementedCommand,
		"queue":       NotImplementedCommand,
		"clear-queue": NotImplementedCommand,
		"help":        NotImplementedCommand,
	}
)

func RegisterCommands(s *discordgo.Session) {

	registeredCommands := make([]*discordgo.ApplicationCommand, len(commands))
	for i, v := range commands {
		cmd, err := s.ApplicationCommandCreate(s.State.User.ID, "", v)
		if err != nil {
			log.Panicf("Cannot create '%v' command: %v", v.Name, err)
		}
		registeredCommands[i] = cmd
	}
}

func DeleteCommands(s *discordgo.Session) {
	commands, err := s.ApplicationCommands(s.State.User.ID, "")
	if err != nil {
		log.Panicf("Cannot get commands: %v", err)
	}

	for _, v := range commands {
		err = s.ApplicationCommandDelete(s.State.User.ID, "", v.ID)
		if err != nil {
			log.Panicf("Cannot delete '%v' command: %v", v.Name, err)
		}
	}
}

func SetCommands(s *discordgo.Session) {
	s.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		if h, ok := commandHandlers[i.ApplicationCommandData().Name]; ok {
			h(s, i)
		}
	})
}

func NotImplementedCommand(s *discordgo.Session, i *discordgo.InteractionCreate) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Command not implemented yet! 😘",
		},
	})
}
