import { Customer } from 'src/app/classes/customer';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CustomersService {

    public data: Customer[] = [];

    constructor(private api: ApiService) { }

    public async iam(params) {
        return await this.api.post(environment.store, '/store/customers/iam', params);
    }

    public async add(params) {
        return await this.api.post(environment.store, '/store/customers/add', params);
    }

    public async get(params) {
        return await this.api.post(environment.store, '/store/customers/get', params);
    }

    public async list(params) {
        return await this.api.post(environment.store, '/store/customers/list', params);
    }

    public async update(params) {
        return await this.api.post(environment.store, '/store/customers/update', params);
    }

    public async delete(params) {
        return await this.api.post(environment.store, '/store/customers/delete', params);
    }

}
