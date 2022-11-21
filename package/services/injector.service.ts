import 'reflect-metadata';
export class Injector {

	private diMap = new Map();

	getInstance<T>(contr: Constructable<T>): T {
		const instance = this.constructObject(contr);
		return instance;
	}

	private constructObject(constructor: Constructable) {

		let currentInstance = this.diMap.get(constructor)
		if (currentInstance) return currentInstance;

		const metaData: Constructable[] = Reflect.getMetadata('design:paramtypes', constructor);
		// We need to init each constructor function into it's instance
		const argumentsInstances = metaData?.map((params) => this.constructObject(params)) ?? [];

		currentInstance = new constructor(...argumentsInstances);
		this.diMap.set(constructor, currentInstance);

		return currentInstance;
	}
}

export interface Constructable<T = any> {
	new(...params): T;
}

export function Injectable(constructor: Constructable): Constructable {
	const original = constructor;
	return original;
}

export function Inject(variable: string) {
	return function (target: Object, propertyKey: string) {

		const getter = function () {
			return process.env[variable];
		};

		Object.defineProperty(target, propertyKey, {
			get: getter
		});
	}
}