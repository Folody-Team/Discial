import { MemberInput, UserInput } from '../typings/UserInput';
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
	roles!: any[];
	premium_since: any;
	pending!: boolean;
	nick!: string;
	mute!: boolean;
	joined_at!: string;
	flags!: number;
	deaf!: boolean;
	communication_disabled_until!: null;
	avatar?: string | undefined;
	constructor(token: string, MemberData: MemberInput) {
		Object.assign(this, { MemberData });
		this.token = token;
	}
}
