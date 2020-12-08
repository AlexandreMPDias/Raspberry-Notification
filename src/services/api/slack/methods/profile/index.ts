// import Runner from './runner';
import chalk from 'chalk';
import { SlackRequestClass } from '../../utils/request';
import * as types from '../profile/types';

export class SlackProfile extends SlackRequestClass {

	public getProfile = async (): Promise<Slack.Profile | null> => {
		const response = await this.get<{ data: { profile: Slack.Profile } }>('users.profile.get');
		return response?.data?.profile;
	}

	/**
	 * Update the Profile in Slack
	 * 
	 * @param {string} text the message in the status
	 * @param {string} emoji the emoji in the status
	 * @param {number} expiration expiration of the status [in hours]
	 * [expiration = 0] => no expiration
	 */
	public set = (text: string, emoji: string, expiration: number = 0): Promise<any> => {
		const unixTime = expiration * 3.6e+6;
		const data: types.IStatusUpdateArgs = {
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

export default new SlackProfile();