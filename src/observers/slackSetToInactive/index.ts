import DateService from '../../services/date';
import SlackSetToInactiveObserverUtils from './utils';

class SlackSetToInactiveObserver extends SlackSetToInactiveObserverUtils implements IObserver {

	public init = () => {
		// setInterval(this.updateBlink, 5000 * 60);
	}

	public shouldExecute = () => {
		return DateService.workhour.is();
	}

	public handle = async () => {
		const elapsed = this.getTimeSinceLastHandle();
		const handleFrequency = this.getHandleFrequency();
		if (elapsed >= handleFrequency) {
			console.log(`SlackSetToInactive: ${elapsed} seconds since last handle - handling`);

			const status = await this.getSlackStatus();
			if (status.presence === 'away') {
				this.blinkingEnable = true
				if (!this.led.isBlinking) {
					this.led.blink(100);
				}
			} else {
				this.led.stopBlinking();
				this.led.turnOff();
			}
		}
	}
}


export default new SlackSetToInactiveObserver();