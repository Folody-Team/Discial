export interface UserInput {
  verified: boolean;
  username: string;
  mfa_enabled: boolean;
  id: string;
  flags: number;
  email: null;
  discriminator: string;
  bot: boolean;
  avatar?: string;
}

export interface MemberInput {
  roles: any[];
  premium_since: any;
  pending: boolean;
  nick: string;
  mute: boolean;
  joined_at: string;
  flags: number;
  deaf: boolean;
  communication_disabled_until: null;
  avatar?: string;
}
