package configuration

type Arguments struct {
	DISCORD_REGISTER_COMMANDS bool
	DISCORD_DELETE_COMMANDS   bool
	DISCORD_COPILOT_MODE      bool
}

var Args Arguments = defaultArguments()

func LoadArguments(params []string) {

	//if exists "discord-register" in params

	Args.DISCORD_REGISTER_COMMANDS = false

	for _, param := range params {
		switch param {
		case "discord-register":
			Args.DISCORD_REGISTER_COMMANDS = true
		case "discord-copilot":
			Args.DISCORD_COPILOT_MODE = true
		case "discord-delete":
			Args.DISCORD_DELETE_COMMANDS = true
		}
	}

}

func defaultArguments() Arguments {
	return Arguments{
		DISCORD_REGISTER_COMMANDS: false,
		DISCORD_DELETE_COMMANDS:   false,
		DISCORD_COPILOT_MODE:      false,
	}
}
