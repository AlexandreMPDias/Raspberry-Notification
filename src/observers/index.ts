import DateService from '../services/date';

// Observers
import automaticSlackBootInMorning from './automaticSlackBootInMorning';
import slackSetToInactive from './slackSetToInactive';

const observers: IObserver[] = [
	automaticSlackBootInMorning,
	slackSetToInactive
]

function loop() {
	const activeObservers = observers.filter(observer => observer.shouldExecute())
	if (activeObservers.length > 0) {
		console.log(`-- ${DateService.timestamp}`);
	}
	activeObservers.forEach(observer => observer.handle())
}

function init() {
	observers.forEach(observer => {
		if (observer.init) {
			observer.init();
		}
	})
}

export default {
	init,
	loop
};