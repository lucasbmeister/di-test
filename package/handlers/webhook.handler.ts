import { Constructable } from '../services/injector.service';
import { IRequestHandler } from '../types/request-handler.interface';

export class WebhookHandler {

	static handle(context: any, request: any): WebhookHandler {
		const instance = new WebhookHandler()
		return instance
	}

	register<T extends IRequestHandler>(classes: Array<Constructable<T>>): Promise<void> {
		return new Promise((resolve) => {
			classes.forEach(c => {
				const meta = Reflect.getMetadata('webhookListener', c)
				if (meta) {
					//registrar com base nos dados
					console.log(meta)
				} else {
					throw Error(`Classe ${c.name} não configurada para webhook`)
				}
			})
			resolve()
		})
	}
}