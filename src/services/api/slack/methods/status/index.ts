// import Runner from './runner';
import chalk from 'chalk';
import { SlackRequestClass } from '../../utils/request';


export class SlackStatus extends SlackRequestClass {
	setActive = async () => {
		console.log(`Setting ${chalk.yellow("Slack.presence")} to ${chalk.green('active')}`)
		return this.post('users.setPresence', { presence: 'auto' })
	}

	setInactive = async () => {
		console.log(`Setting ${chalk.yellow("Slack.presence")} to ${chalk.red('inactive')}`)
		return this.post('users.setPresence', { presence: 'away' })

	}

	getStatus = async (): Promise<Slack.Status> => {
		const response = await this.get<{ data: Slack.Status }>('users.getPresence')
		return response.data
	}
}

export default new SlackStatus();