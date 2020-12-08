import chalk from 'chalk';
import slackObserver from './slack';

const observers: IObserver[] = [
	slackObserver
]

async function loop() {
	const activeObservers = observers.filter(observer => observer.shouldExecute())
	await Promise.all(activeObservers.map(observer => observer.handle()));
}

async function init() {
	await slackObserver.init();

	console.success(`Global Observers ${chalk.green('initialized')}`)
}

export default {
	init,
	loop
};