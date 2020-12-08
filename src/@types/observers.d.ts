declare interface IObserver {
	name: string;
	init?: VoidFunction;
	shouldExecute: () => boolean;
	handle: VoidFunction;
}