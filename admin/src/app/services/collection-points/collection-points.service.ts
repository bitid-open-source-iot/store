import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { CollectionPoint } from 'src/app/classes/collection-point';

@Injectable({
	providedIn: 'root'
})

export class CollectionPointsService {

	public data: CollectionPoint[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.store, '/store/collection-points/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.store, '/store/collection-points/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.store, '/store/collection-points/list', params);
	}

	public async update(params) {
		return await this.api.post(environment.store, '/store/collection-points/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.store, '/store/collection-points/delete', params);
	}

}
