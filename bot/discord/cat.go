package discord

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/akrck02/moonbot/configuration"
	"github.com/bwmarrin/discordgo"
)

type CatImage struct {
	Url string `json:"url"`
}

func CatCommand(s *discordgo.Session, i *discordgo.InteractionCreate) {

	// get cat image from cat api
	var catImageUrl string = "https://api.thecatapi.com/v1/images/search"

	// add api key to request
	req, err := http.NewRequest("GET", catImageUrl, nil)

	if err != nil {
		panic(err)
	}

	req.Header.Set("x-api-key", configuration.Params.CAT_API_TOKEN)

	// send request
	client := &http.Client{}
	response, err := client.Do(req)

	if err != nil {
		panic(err)
	}

	//parse response as cat image
	var catImage []CatImage
	json.NewDecoder(response.Body).Decode(&catImage)

	//send cat image to discord
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Embeds: []*discordgo.MessageEmbed{
				{
					Title: "A new cat image!",
					Image: &discordgo.MessageEmbedImage{
						URL: catImage[0].Url,
					},
					Color: randomHexColor(),
					Type:  "image",
				},
			},
		},
	})
}

func randomHexColor() int {

	// generate random number between 0 and 16777215
	randomNumber := rand.Intn(16777215)

	// convert to hex
	hexColor := fmt.Sprintf("%x", randomNumber)

	// convert to int
	intColor, _ := strconv.ParseInt(hexColor, 16, 32)

	return int(intColor)
}
