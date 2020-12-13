import DateService from "../../services/date";
import PendingReviewUtils from "./utils";
class PendingReviewObserver
	extends PendingReviewUtils
	implements IObserver {
	public readonly name = "slack.setToInactive";

	public init = () => { };

	public shouldExecute = () => {
		const deltaSeconds = DateService.elapsed(this.lastHandle);
		return deltaSeconds >= 25;
		// return DateService.workhour.is() && deltaSeconds >= 5;
	};

	public handle = async () => {
		this.lastHandle = DateService.now();
		this.blinkingEnable = await this.shouldBlink();

		if (this.blinkingEnable) {
			this.led.blink(100);
		} else {
			this.led.stopBlinking();
		}
	};
}

export default new PendingReviewObserver();
