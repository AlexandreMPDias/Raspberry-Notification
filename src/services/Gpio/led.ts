import { Gpio } from 'onoff'

class Led {
    private pin: number;
    private io: Gpio;
    private active: boolean;
    private blinking: boolean;
    private interval: NodeJS.Timeout;

    constructor(pin: number) {
        this.pin = pin;
        this.io = new Gpio(this.pin, "out");
        this.active = false;
        this.turnOff();
    }

    turnOn = () => {
        this.active = true;
        this.io.writeSync(1)
    }

    turnOff = () => {
        this.active = false
        this.io.writeSync(0)
    }

    blink = (frequency: number = 500) => {
        this.blinking = true;
        if(this.interval) {
            clearInterval(this.interval)
        }
        this.interval = setInterval(() => {
            const active = this.io.readSync();
            this.active = Boolean(active);
            this.io.writeSync(active ? 0 : 1)
        }, frequency)
    }

    stopBlinking = () => {
        this.blinking = false;
        if(this.interval) {
            clearInterval(this.interval)
        }
    }

    get isOn() {
        return this.active;
    }

    get isBlinking() {
        return this.blinking
    }
}

export default Led;