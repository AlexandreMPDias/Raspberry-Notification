

import chalk from 'chalk'

function getWorkhourMethods(getNow: () => Date, limits: Record<'from' | 'to', number>) {

	return {
		is: (): boolean => {
			const now = getNow();
			const hour = now.getHours();
			const min = now.getMinutes();
			const time = hour + Number((min / 60).toFixed(2));

			return limits.from <= time && time <= limits.to
		},
		pretty: (): string => {
			return Object.values(limits).map(t => chalk.green(t.toFixed(2).replace(/\D/, ':'))).join(' ~ ')
		}
	}
}

type Workhour = ReturnType<typeof getWorkhourMethods>
export { getWorkhourMethods as getter, Workhour as type };