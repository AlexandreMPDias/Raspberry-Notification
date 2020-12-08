
import chalk from 'chalk'
import { differenceInSeconds } from 'date-fns';
import DateServiceConstants from './constants';
import * as format from './format';
import * as workhour from './workhour'

class DateServiceConstructor extends DateServiceConstants {
	public readonly TIMEZONE = -3;
	public workhour: workhour.type;
	public format: format.type;

	public get timestamp() {
		return chalk.green(this.format(this.now(), 'dd/MM HH:mm'));
	}

	public constructor() {
		super();
		this.format = format.method;
		this.workhour = workhour.getter(this.now, this.WORK_HOUR);

	}

	public now = () => {
		return this.applyTimezone(new Date())
	}

	public elapsed = (since: Dateish) => {
		return differenceInSeconds(since, this.now())
	}

	private applyTimezone = (date: number | Date): Date => {
		const d = new Date(date);
		d.setHours(d.getHours() + Math.floor(this.TIMEZONE));
		return d;
	}

}


const DateService = new DateServiceConstructor();

export default DateService;