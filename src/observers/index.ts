// Observers
import automaticSlackBootInMorning from './automaticSlackBootInMorning';
import slackSetToInactive from './slackSetToInactive';

const observers: IObserver[] = [
	automaticSlackBootInMorning,
	slackSetToInactive
]

function loop() {
	const activeObservers = observers.filter(observer => observer.shouldExecute())
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