class MockGpio {
	private state: number = 0;
	public static empty = (...args: any[]): any => { /**/ }
	constructor(pin: number, mode: string) { console.log(`USING MOCKED GPIO`) }
	writeSync: (...args: any[]) => any = (x) => {
		console.log(`LED ${x ? 'on' : 'off'}`)
		this.state = x;
	};
	readSync: (...args: any[]) => any = () => this.state
}

export { MockGpio }