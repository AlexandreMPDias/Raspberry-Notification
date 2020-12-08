import DateService from '../../../services/date';
import ObserverUtils from './utils';

class SlackObserver extends ObserverUtils implements IObserver {

	public readonly name = "global.slack"

	public init = async () => {
		await this.updateSlackData();
	}

	public shouldExecute = () => {
		const deltaSeconds = DateService.elapsed(this.lastHandle);
		return deltaSeconds >= 2;
	}

	public handle = async () => {
		await this.updateSlackData();
		this.lastHandle = DateService.now();
	}
}


export default new SlackObserver();