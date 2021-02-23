import { Injectable } from '@angular/core';
import { Department } from 'src/app/classes/department';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class DepartmentsService {

	public data: Department[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.store, '/store/departments/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.store, '/store/departments/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.store, '/store/departments/list', params);
	}

	public async update(params) {
		return await this.api.post(environment.store, '/store/departments/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.store, '/store/departments/delete', params);
	}

}
