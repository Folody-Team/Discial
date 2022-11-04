import fetch from "node-fetch";

export interface BaseChannelType {
	id: string;
	last_message_id: string;
	type: number;
	name: string;
	position: number;
	flags: number;
	parent_id: string;
	topic: null;
	guild_id: string;
	permission_overwrites: {
		id: string;
		type: number;
		allow: string;
		deny: string;
	}[];
	rate_limit_per_user: number;
	nsfw: boolean;
}

export class BaseChannel implements BaseChannelType {
	id!: string;
	last_message_id!: string;
	type!: number;
	name!: string;
	position!: number;
	flags!: number;
	parent_id!: string;
	topic!: null;
	guild_id!: string;
	permission_overwrites!: {
		id: string;
		type: number;
		allow: string;
		deny: string;
	}[];
	rate_limit_per_user!: number;
	nsfw!: boolean;
	token: string;
	constructor(data: BaseChannelType, token: string) {
		Object.assign(this, data);
		this.token = token;
	}

	public static async GetChannelById(id: string, token: string) {
		const ChannelData = await (
			await fetch(`https://discord.com/api/v10/channels/${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bot ${token}`,
					'Content-Type': 'application/json; charset=UTF-8',
					'User-Agent':
						'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
				},
			})
		).json();
		return new BaseChannel(ChannelData, token);
	}
}
