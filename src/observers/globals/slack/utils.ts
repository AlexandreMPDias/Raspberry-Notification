import { Slack } from '../../../services/api';
import DateService from '../../../services/date';

interface ISlackData {
	status: Slack.Status;
	profile: Slack.Profile
}

class ObserverUtils {

	protected lastHandle: Date = DateService.now();
	protected lastSlackData: ISlackData = {} as any;

	protected updateSlackData = async (): Promise<void> => {
		const [status, profile]: any = await Promise.all([Slack.status.getStatus, Slack.profile.getProfile].map(async getter => getter()))
		this.lastSlackData = { status, profile };
	}

	public get profile(): Slack.Profile {
		return this.lastSlackData?.profile
	}

	public get status(): Slack.Status {
		return this.lastSlackData?.status;
	}

	public get data(): ISlackData {
		return this.lastSlackData;
	}
}


export default ObserverUtils