package discord

import (
	"strings"

	"github.com/akrck02/moonbot/markdown"
	"github.com/bwmarrin/discordgo"
)

func PollCommand(s *discordgo.Session, i *discordgo.InteractionCreate) {

	// get poll options from interaction data
	question := i.ApplicationCommandData().Options[0].Value.(string)
	optionSet := i.ApplicationCommandData().Options[1].Value.(string)
	options := strings.Split(optionSet, ",")

	// create poll embed
	embed := &discordgo.MessageEmbed{
		Title:  question,
		Fields: []*discordgo.MessageEmbedField{},
		Color:  randomHexColor(),

		Footer: &discordgo.MessageEmbedFooter{
			Text: "Poll created by " + i.Member.User.Username,
		},
		Type: "rich",
	}

	// add options to poll embed
	var poolOptionSetString = ""

	// empty array of icons
	var icons []string = []string{}
	for _, option := range options {
		icon := markdown.RandomIconWithBuffer(icons)
		icons = append(icons, icon)
		option = strings.TrimSpace(option)
		poolOptionSetString += "> " + icon + "   |   **" + option + "**\n\n"
	}

	pool := &discordgo.MessageEmbedField{
		Name:   "Vote with reactions!",
		Value:  poolOptionSetString,
		Inline: true,
	}

	embed.Fields = append(embed.Fields, pool)

	// add reactions to poll embed message (poll)
	is, _ := s.ChannelMessageSendEmbed(i.ChannelID, embed)

	for _, icon := range icons {
		s.MessageReactionAdd(is.ChannelID, is.ID, icon)
	}

	// respond to interaction with feedback
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "Poll created!",
		},
	})

}
