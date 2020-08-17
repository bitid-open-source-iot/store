import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CouriersService {

    public data: any[] = [];

    constructor(private api: ApiService) {};

    public async get(params) {
        return await this.api.put(environment.store, '/store/couriers/get', params);
    };

    public async list(params) {
        return await this.api.put(environment.store, '/store/couriers/list', params);
    };

}