import { Inject, Injectable } from '../package/services/injector.service';
import { OtherService } from './other.service';

@Injectable
export class SomeService {

	@Inject('TESTE_TOKEN')
	private testeToken: string

	constructor(private teste: OtherService){
		console.log(this.testeToken)
	}
}