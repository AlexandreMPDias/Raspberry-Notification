import { Gpio } from './gpioModule.secret'

const GpioClass = Gpio;

class Led {
    private pin: number;
    private io: Gpio;
    private active: boolean;
    private blinking: boolean;
    private interval: NodeJS.Timeout;
    private blinkingFrequency: number | null = null;

    constructor(pin: number) {
        this.pin = pin;
        this.io = new GpioClass(this.pin, "out");
        this.active = false;
        this.turnOff();
    }

    turnOn = (skipCheck?: true) => {
        if (!this.active || skipCheck) {
            this.active = true;
            this.io.writeSync(1)
        }
    }

    turnOff = (skipCheck?: true) => {
        if (this.active || skipCheck) {
            this.active = false
            this.io.writeSync(0)
        }
    }

    blink = (frequency: number = 500) => {
        const shouldNoBlink = [
            this.blinking,
            frequency === this.blinkingFrequency
        ].every(x => x);
        if (shouldNoBlink) return;
        this.stopBlinking();

        this.blinking = true;
        this.blinkingFrequency = frequency;
        this.interval ?? clearInterval(this.interval)
        this.interval = setInterval(() => {
            if (this.active) {
                this.turnOff(true);
            } else {
                this.turnOn(true);
            }
        }, frequency)
    }

    stopBlinking = () => {
        this.blinking = false;
        this.interval && clearInterval(this.interval)
        this.blinkingFrequency = null;
        this.turnOff()

    }

    get isOn() {
        return this.active;
    }

    get isBlinking() {
        return this.blinking
    }
}

export default Led;