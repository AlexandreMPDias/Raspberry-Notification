import "./config";
import DateService from './services/date';
import observers from './observers';
import chalk from 'chalk';

console.log('Starting execution');

function main() {
    console.log(`Workhours set to ${DateService.workhour.pretty()}`);
    observers.init();
    setInterval(() => {
        console.log(`-- ${DateService.timestamp} ${DateService.workhour.is() ? chalk.red('workhour') : chalk.green('non workhour')}`);
    }, 1000 * 60);
    setInterval(observers.loop, 1000)
}

main();