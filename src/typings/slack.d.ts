declare namespace Slack {

	interface Status {
		presence: 'away' | 'auto'
		online: boolean
		last_activity: number
	}
}
