import { Injectable } from '../package/services/injector.service'
import { IRequestHandler } from '../package/types/request-handler.interface'
import { SomeService } from './some.service'

@Injectable
export class HandlerService implements IRequestHandler {
	constructor(
		private someService: SomeService,
	) {
		//inicializar alguma coisa
		console.log('constructor')
	}

	//tratar requisicao
	async handle(context: any, request: any): Promise<void> {
		console.log('handle')
		console.log(context)
		console.log(request)
		console.log(this.someService)
	}
}