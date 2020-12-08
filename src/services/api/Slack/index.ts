// import Runner from './runner';
import chalk from 'chalk';
import { SlackRequestClass } from './requests';

class SlackStatus extends SlackRequestClass {
	setActive = async () => {
		console.log(`Setting ${chalk.green('active')}`)
		return this.post('users.setPresence', { presence: 'auto' })
	}

	setInactive = async () => {
		console.log(`Setting ${chalk.red('inactive')}`)
		setTimeout(() => {
			this.getStatus();
		}, 2000);
		return this.post('users.setPresence', { presence: 'away' })

	}

	getStatus = async () => {
		const response = await this.get<{ data: Slack.Status }>('users.getPresence')
		return (response.data);
	}

	/**
	 * Update the Status in Slack
	 * 
	 * @param {string} text the message in the status
	 * @param {string} emoji the emoji in the status
	 * @param {number} expiration expiration of the status [in hours]
	 * [expiration = 0] => no expiration
	 */
	public updateStatus(text: string, emoji: string, expiration: number = 0): Promise<any> {

		const unixTime = expiration * 3600 * 1000 * 6000;
		const data: any = {
			profile: {
				"status_text": text,
				"status_emoji": emoji,
				"status_expiration": unixTime
			}
		}
		console.log(`Setting status [ ${chalk.yellow(text)} | ${chalk.yellow(emoji)} ] - Expires in [ ${chalk.yellow(expiration)} hours ]`);
		return this.post('users.profile.set', data)
	}
}

export default new SlackStatus();