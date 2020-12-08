import "./config";
import chalk from 'chalk'
import Slack from '../../services/api/Slack';
import IO from '../../services/Gpio';
import DateService from '../../services/date';

class SlackSetToInactiveObserverUtils {

	protected led = IO.led.inactiveStatus;

	protected lastHandle: Date = DateService.now();
	protected lastSlackStatus: Slack.Status | null = null;
	protected blinkingFrequency: number = 300;
	protected blinkingEnable: boolean = false;

	protected getHandleFrequency = () => {
		if (this.lastSlackStatus) {
			if (this.lastSlackStatus.presence === 'away') {
				return 1000 * 60;
			}
		}
		return 1000 * 60 * 5;
	}

	protected getSlackStatus = async (): Promise<Slack.Status> => {
		const status = await Slack.getStatus();
		this.lastSlackStatus = status;
		return status;
	}

	protected updateBlink = () => {
		if (this.blinkingEnable) {
			this.led.blink(this.blinkingFrequency)
		}
	}

	protected getTimeSinceLastHandle = (): number => {
		const elapsed = DateService.elapsed(this.lastHandle);
		this.lastHandle = DateService.now();
		return elapsed;
	}
}


export default SlackSetToInactiveObserverUtils