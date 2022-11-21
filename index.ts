import { filter, map } from 'rxjs/operators';
import { RequestHandler } from './package/handlers/request.handler';
import { HandlerService } from './services/handler.service';

export default (context: any, request: any) => RequestHandler
	.handle(context, request)
	.pipe(
		filter((request: any): boolean => {
			return request.request === 'Teste2'
		}),
		map((request): any => {
			return {
				...request,
				teste3: 'teste'
			}
		})
	)
	.with(HandlerService)
