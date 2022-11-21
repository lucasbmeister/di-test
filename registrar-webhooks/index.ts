
import { WebhookHandler } from '../package/handlers/webhook.handler';
import { HandlerService } from '../some-function/services/handler.service';

export default (context: any, request: any) => WebhookHandler
	.handle(context, request)
	.register([
		HandlerService
	])
