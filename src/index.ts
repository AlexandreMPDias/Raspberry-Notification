import "./config";
import DateService from './services/date';
import observers from './observers';

console.log('Starting execution');

function main() {
    console.log(`Workhours set to ${DateService.workhour.pretty()}`);
    observers.init();
    setInterval(observers.loop, 100)
}

main();