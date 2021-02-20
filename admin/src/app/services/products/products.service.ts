import { Product } from 'src/app/classes/product';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    public data: Product[] = [];

    constructor(private api: ApiService) { }

    public async add(params) {
        return await this.api.post(environment.store, '/store/products/add', params);
    }

    public async get(params) {
        return await this.api.post(environment.store, '/store/products/get', params);
    }

    public async list(params) {
        return await this.api.post(environment.store, '/store/products/list', params);
    }

    public async update(params) {
        return await this.api.post(environment.store, '/store/products/update', params);
    }

    public async delete(params) {
        return await this.api.post(environment.store, '/store/products/delete', params);
    }

}
