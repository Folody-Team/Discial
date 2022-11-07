import { Member } from '../user';
import fetch from 'node-fetch';
import { Author } from '../user/index';
import { BaseChannel } from '../channel';

export interface MessageRawData {
	type: number;
	tts: boolean;
	timestamp: string;
	referenced_message: null;
	pinned: boolean;
	nonce: string;
	mentions: never[];
	mention_roles: never[];
	mention_everyone: boolean;
	member: Member;
	id: string;
	flags: number;
	embeds: never[];
	edited_timestamp: null;
	content: string;
	components: never[];
	channel_id: string;
	author: Author;
	attachments: never[];
	guild_id: string;
}

export class Message implements MessageRawData {
	type!: number;
	tts!: boolean;
	timestamp!: string;
	referenced_message!: null;
	pinned!: boolean;
	nonce!: string;
	mentions!: never[];
	mention_roles!: never[];
	mention_everyone!: boolean;
	member!: Member;
	id!: string;
	flags!: number;
	embeds!: never[];
	edited_timestamp!: null;
	content!: string;
	components!: never[];
	channel_id!: string;
	author!: Author;
	attachments!: never[];
	guild_id!: string;
	channel!: BaseChannel;
	
	
	protected token: string;

	constructor(
		userData: MessageRawData & { channel: BaseChannel },
		token: string
	) {
		Object.assign(this, userData);
		this.token = token;
	}
	public static async GetMessageByID(
		id: string,
		channelID: string,
		token: string
	) {
		const MessageData = await (
			await fetch(
				`https://discord.com/api/v10/channels/${channelID}/messages/${id}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bot ${token}`,
						'Content-Type': 'application/json; charset=UTF-8',
						'User-Agent':
							'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
					},
				}
			)
		).json();

		const ChannelData = await BaseChannel.GetChannelById(
			MessageData.channel_id,
			token
		);
		const MemberData = await Member.GetMemberByUserIDAndGuildID(
			MessageData.author.id,
			ChannelData.guild_id,
			token
		);
		const MessageAuthor = new Author(MessageData.author, token);
		return new Message(
			{
				...MessageData,
				channel: ChannelData,
				member: MemberData,
				author: MessageAuthor,
			},
			token
		);
	}
	public async send(content:string) {
		await fetch(
			`https://discord.com/api/v10/channels/${this.channel_id}/messages`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bot ${this.token}`,
					'Content-Type': 'application/json; charset=UTF-8',
					'User-Agent':
						'DiscordBot (https://github.com/Folody-Team/Discial, 1.0.0)',
				},
				body: JSON.stringify({
					content: content,
				}),
			}
		);
	}
}
