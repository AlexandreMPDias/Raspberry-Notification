import "./config";
import DateService from './services/date';
import observers from './observers';
import globalObservers from './observers/globals';
import chalk from 'chalk';

console.log('Starting execution');

const showTimestamp = () => {
    console.log(`-- ${DateService.timestamp} ${DateService.workhour.is() ? chalk.red('in workhour') : chalk.green('outside workhour')}`)
}

async function main() {
    await globalObservers.init();
    console.log(`Workhours set to ${DateService.workhour.pretty()}`);
    observers.init();
    setInterval(showTimestamp, 1000 * 60);
    setInterval(globalObservers.loop, 1000);
    setInterval(observers.loop, 1000)
}

main();