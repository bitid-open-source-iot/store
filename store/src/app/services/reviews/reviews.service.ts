import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ReviewsService {

    public data: any[] = [];

    constructor(private api: ApiService) {};

    public async add(params) {
        return await this.api.post(environment.store, '/store/reviews/add', params);
    };

    public async get(params) {
        return await this.api.put(environment.store, '/store/reviews/get', params);
    };

    public async list(params) {
        return await this.api.put(environment.store, '/store/reviews/list', params);
    };

    public async update(params) {
        return await this.api.post(environment.store, '/store/reviews/update', params);
    };

    public async delete(params) {
        return await this.api.post(environment.store, '/store/reviews/delete', params);
    };

}