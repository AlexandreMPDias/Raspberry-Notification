import Slack from '../../services/api/Slack';
import DateService from '../../services/date';

class AutomaticSlackBootInMorning implements IObserver {

	public readonly name = "automatic.slack.boot.inMorning"

	public init = () => {
		// setInterval(this.updateBlink, 5000 * 60);
	}

	public shouldExecute = () => {
		const now = DateService.now();
		return now.getHours() === 9 && now.getMinutes() <= 20
	}

	public handle = async () => {

		const status = await Slack.getStatus();
		if (status.presence === 'away') {
			Slack.updateStatus("Booting", ":zzz:");
		}
	}
}


export default new AutomaticSlackBootInMorning();