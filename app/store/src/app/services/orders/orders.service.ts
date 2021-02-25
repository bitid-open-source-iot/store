import { Order } from 'src/app/classes/order';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class OrdersService {

	public data: Order[] = [];

	constructor(private api: ApiService) { }

	public async get(params) {
		return await this.api.post(environment.store, '/store/orders/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.store, '/store/orders/list', params);
	}

}
