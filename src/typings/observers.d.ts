declare interface IObserver {
	init?: VoidFunction;
	shouldExecute: () => boolean;
	handle: VoidFunction;
}