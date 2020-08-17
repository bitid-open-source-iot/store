import { Product } from 'src/app/interfaces/product';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    public data: Product[] = [];

    constructor(private api: ApiService) {};

    public async get(params: any) {
        return await this.api.put(environment.store, '/store/products/get', params);
    };

    public async list(params: any) {
        return await this.api.put(environment.store, '/store/products/list', params);
    };

}