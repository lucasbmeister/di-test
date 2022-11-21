import { Observable, of, OperatorFunction } from 'rxjs';
import { Constructable, Injector } from '../services/injector.service';
import { IRequestHandler } from '../types/request-handler.interface';

export class RequestHandler {

	private context: any;
	private request: Observable<any>;
	private injector: Injector;
	private pipes: Array<OperatorFunction<any, any>>
	static handle(context: any, request: any) {
		const instance = new RequestHandler()
		instance.injector = new Injector()
		instance.context = context
		instance.request = of(request)
		return instance
	}

	pipe(...operations: OperatorFunction<any, any>[]): RequestHandler {
		this.pipes = operations
		return this
	}

	with<T extends IRequestHandler>(clazz: Constructable<T>): Promise<void> {
		return new Promise((resolve) => {
		// @ts-ignore
		this.request.pipe(...(this.pipes ?? []))
			.subscribe(async (request) => {
				const handleInstance = this.injector.getInstance<T>(clazz)
				await handleInstance.handle(this.context, request)
				resolve()
			})
		})
	}
}