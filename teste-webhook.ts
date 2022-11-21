import dotenv from 'dotenv'
import httpTrigger from './registrar-webhooks/index'

dotenv.config()

const testes = [
	{
		context: { context: 'teste' },
		request: { request: 'Prop1' }
	}
]
const testeFn = async (): Promise<void> => {
	for await (const teste of testes) {
		await httpTrigger(teste.context, teste.request)
	}
}

testeFn().then(() => console.log('teste concluído'))
