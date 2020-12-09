import DateService from '../../services/date';
import SlackSetToInactiveObserverUtils from './utils';
class SlackSetToInactiveObserver extends SlackSetToInactiveObserverUtils implements IObserver {

	public readonly name = "slack.setToInactive"

	public init = () => {
	}

	public shouldExecute = () => {
		return DateService.workhour.is();
	}

	public handle = () => {
		this.blinkingEnable = this.shouldBlink();

		if (this.blinkingEnable) {
			this.led.blink(100)
		} else {
			this.led.stopBlinking()
		}
	}
}


export default new SlackSetToInactiveObserver();