import format from 'date-fns/format';

interface IFormat {
	(date: Dateish, key: "HH:mm" | "DD/MM HH:mm"): string;
}

const myFormat: IFormat = (date, key) => {
	return format(date, key);
}

export {
	IFormat as type,
	myFormat as method
}