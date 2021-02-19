import { Supplier } from 'src/app/classes/supplier';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class SuppliersService {

    public data: Supplier[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.store, '/store/suppliers/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.store, '/store/suppliers/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.store, '/store/suppliers/list', params);
	}

	public async update(params) {
		return await this.api.post(environment.store, '/store/suppliers/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.store, '/store/suppliers/delete', params);
	}

}