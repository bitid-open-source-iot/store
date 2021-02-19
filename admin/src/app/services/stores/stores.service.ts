import { Store } from 'src/app/classes/store';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class StoresService {

	public data: Store[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.store, '/store/stores/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.store, '/store/stores/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.store, '/store/stores/list', params);
	}

	public async share(params) {
		return await this.api.post(environment.store, '/store/stores/share', params);
	}

	public async update(params) {
		return await this.api.post(environment.store, '/store/stores/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.store, '/store/stores/delete', params);
	}

	public async unsubscribe(params) {
		return await this.api.post(environment.store, '/store/stores/unsubscribe', params);
	}

	public async updatesubscriber(params) {
		return await this.api.post(environment.store, '/store/stores/updatesubscriber', params);
	}

}
