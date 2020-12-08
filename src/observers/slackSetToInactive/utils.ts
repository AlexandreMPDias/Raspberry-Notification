import IO from '../../services/Gpio';
import DateService from '../../services/date';
import SlackObserver from '../globals/slack';

class SlackSetToInactiveObserverUtils {

	protected led = IO.led.inactiveStatus;

	protected lastHandle: Date = DateService.now();
	protected blinkingFrequency: number = 300;
	protected blinkingEnable: boolean = false;

	protected shouldBlink = (): boolean => {
		const { profile } = SlackObserver.data;

		return !!profile.status_text?.match(/Away|Booting/);
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