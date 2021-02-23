import { Courier } from 'src/app/classes/courier';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CouriersService {

    public data: Courier[] = [];

    constructor(private api: ApiService) { }

    public async add(params) {
        return await this.api.post(environment.store, '/store/couriers/add', params);
    }

    public async get(params) {
        return await this.api.post(environment.store, '/store/couriers/get', params);
    }

    public async list(params) {
        return await this.api.post(environment.store, '/store/couriers/list', params);
    }

    public async update(params) {
        return await this.api.post(environment.store, '/store/couriers/update', params);
    }

    public async delete(params) {
        return await this.api.post(environment.store, '/store/couriers/delete', params);
    }

}
