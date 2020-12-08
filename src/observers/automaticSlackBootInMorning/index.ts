import { Slack } from '../../services/api';
import DateService from '../../services/date';
import SlackObserver from '../globals/slack';
class AutomaticSlackBootInMorning implements IObserver {

	public readonly name = "automatic.slack.boot.inMorning"

	public init = () => {
	}

	public shouldExecute = () => {
		const now = DateService.now();
		return now.getHours() === 9 && now.getMinutes() <= 20
	}

	public handle = () => {
		const { status, profile } = SlackObserver.data;
		if (status.presence === 'away' && profile.status_emoji !== ':zzz:') {
			Slack.profile.set("Booting", ":zzz:");
		}
	}
}


export default new AutomaticSlackBootInMorning();