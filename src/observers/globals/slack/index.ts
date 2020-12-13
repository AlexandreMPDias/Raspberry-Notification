import DateService from '../../../services/date';
import ObserverUtils from './utils';

class SlackObserver extends ObserverUtils implements IObserver {

	public readonly name = "global.slack"

	public init = async () => {
		await this.updateSlackData();
	}

	public shouldExecute = () => {
		const deltaSeconds = DateService.elapsed(this.lastHandle);
		return deltaSeconds >= 600;
	}

	public handle = async () => {
		this.lastHandle = DateService.now();
		await this.updateSlackData();
	}
}


export default new SlackObserver();