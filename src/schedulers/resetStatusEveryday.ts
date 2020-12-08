

import schedule from 'node-schedule';
import { Slack } from '../services/api'

const name = "Reset Status Everyday";

const register = () => {
	schedule.scheduleJob(name, "0 3 * * 2-6", () => {
		Slack.profile.set("Away~", ":away:");
	});
}

export default {
	register,
	name
};