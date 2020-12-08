declare namespace Slack {
	interface Status {
		presence: Slack.Status.Presence;
		online: boolean;
		last_activity: number;
		auto_away: boolean,
		manual_away: boolean,
		connection_count: number,

	}

	interface Profile {
		avatar_hash: string;
		display_name: string;
		display_name_normalized: string;
		email: string;
		fields: any,
		first_name: string;
		image_1024: Link;
		image_512: Link;
		image_192: Link;
		image_24: Link;
		image_32: Link;
		image_48: Link;
		image_72: Link;
		image_original: Link;
		is_custom_image: true,
		last_name: string;
		phone?: string;
		real_name: string;
		real_name_normalized: string;
		skype?: string;
		status_emoji: string;
		status_expiration: number,
		status_text: string;
		status_text_canonical: string;
		title?: string;
		team?: string
	}
}

declare namespace Slack.Status {
	type Presence = "away" | "auto";
}
