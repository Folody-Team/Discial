export const DiscordGateway = {
	init: (version: string | number) => {
		return `wss://gateway.discord.gg/?v=${version}&encoding=json`;
	},
};
