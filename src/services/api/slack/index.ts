import SlackStatus from './methods/status';
import SlackProfile from './methods/profile';

type Profile = Slack.Profile;
type Status = Slack.Status

const status = SlackStatus;
const profile = SlackProfile;

export {
	Profile,
	Status,
	status,
	profile
}