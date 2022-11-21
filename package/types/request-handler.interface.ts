export interface IRequestHandler {
	handle(context: any, request: any): Promise<void>
}