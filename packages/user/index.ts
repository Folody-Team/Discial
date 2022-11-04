import { MemberInput, UserInput, MessageAuthor } from '../typings/UserInput';
import fetch from 'node-fetch';
export class User implements UserInput {
	verified!: boolean;
	username!: string;
	mfa_enabled!: boolean;
	id!: string;
	flags!: number;
	email!: null;
	discriminator!: string;
	bot!: boolean;
	avatar?: string;
	token: string;
	constructor(token: string, UserData: UserInput) {
		Object.assign(this, { UserData });
		this.token = token;
	}
}

export class Member implements MemberInput {
	token: string;
	roles!: string[];
	premium_since: any;
	pending!: boolean;
	nick: string | null = null;
	mute!: boolean;
	joined_at!: string;
	flags!: number;
	deaf!: boolean;
	communication_disabled_until!: null;
	avatar?: string | undefined;
	constructor(token: string, MemberData: MemberInput) {
		Object.assign(this, MemberData);
		this.token = token;
		console.log(this)
	}
	public static async GetMemberByUserIDAndGuildID(
		id: string,
		guildId: string,
		token: string
	) {
		const MemberData = await (
			await fetch(
				`https://discord.com/api/v10/guilds/${guildId}/members/${id}`,
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
		return new Member(token, MemberData);
	}
}

export class Author implements MessageAuthor {
	token: string;
	username!: string;
	public_flags!: number;
	id!: string;
	discriminator!: string;
	avatar_decoration!: null;
	avatar?: string;
	constructor(author: MessageAuthor, token: string) {
		Object.assign(this, author);
		this.token = token;
	}
}
