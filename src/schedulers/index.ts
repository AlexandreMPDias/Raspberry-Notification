import chalk from 'chalk';
import resetStatusEveryday from './resetStatusEveryday';

const cronJobs: Array<{ name: string, register: VoidFunction }> = [
	resetStatusEveryday
];

const scheduleCronJobs = () => {
	cronJobs.forEach(job => job.register());

	console.log(`CronJobs were ${chalk.green('scheduled')}`)
}

export default { scheduleCronJobs };