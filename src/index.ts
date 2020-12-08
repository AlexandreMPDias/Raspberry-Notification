import "./config";
import format from 'date-fns/format';
import IO from './services/Gpio'
import chalk from 'chalk'
import Slack from './services/api/Slack';

console.log('Starting execution');

const TIMEZONE = -3;

const WORKHOUR = {
    from: 11.0,
    to: 16.0
}

const getNow = () => {
    const now = new Date();
    now.setHours(now.getHours() + Math.floor(TIMEZONE));
    return now;
}

const getTimestamp = () => format(getNow(), 'HH:mm')

const fiveMins = 1000 * 60 * 5;

const checkIfWorkHour = () => {
    const now = getNow();
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + Number((min/60).toFixed(2));

    return WORKHOUR.from < time && time < WORKHOUR.to 
}

async function handleSlackStatusObserver() {
    const status = await Slack.getStatus();
    if(status.presence === 'away') {
        if(!IO.led.inactiveStatus.isBlinking) {
            IO.led.inactiveStatus.blink(300 /(getNow().getHours() + 1));
        }
    } else {
        IO.led.inactiveStatus.stopBlinking();
        IO.led.inactiveStatus.turnOff();
    }
}

console.log(`Workhours set to ${Object.values(WORKHOUR).map(t => chalk.green(t.toFixed(2).replace(/\D/,':'))).join(' ~ ')}`)
setInterval(() => {
    const isWorkhour = checkIfWorkHour();
    if(isWorkhour) {
        handleSlackStatusObserver()
    } else {
        console.log(`${chalk.greenBright(getTimestamp())} is outside work hours`)
    }
}, fiveMins)

setInterval(async () => {
    const now = getNow();
    if(now.getHours() === 9 && now.getMinutes() <= 5) {
        const status = await Slack.getStatus();
        if(status.presence === 'away') {
            Slack.updateStatus("Booting", ":zzz:");
        }       
    }
}, fiveMins)
