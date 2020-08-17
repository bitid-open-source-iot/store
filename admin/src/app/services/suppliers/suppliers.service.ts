import { Supplier } from 'src/app/interfaces/supplier';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class SuppliersService {

    public data: Supplier[] = [];

    constructor(private api: ApiService, private localstorage: LocalstorageService) {};

    public async add(params: any) {
        const response = await this.api.post(environment.store, '/store/suppliers/add', params);

        if (response.ok) {
            params.supplierId = response.result.supplierId;
            this.data.push(params);
        };

        return response;
    };

    public async get(params: any) {
        return await this.api.post(environment.store, '/store/suppliers/get', params);
    };

    public async list(params: any) {
        return await this.api.post(environment.store, '/store/suppliers/list', params);
    };

    public async share(params: any) {
        return await this.api.post(environment.store, '/store/suppliers/share', params);
    };

    public async update(params: any) {
        const response = await this.api.post(environment.store, '/store/suppliers/update', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].supplierId == params.supplierId) {
                    Object.keys(params).map(key => {
                        this.data[i][key] = params[key];
                    });
                    break;
                };
            };
        };

        return response;
    };

    public async delete(params: any) {
        const response = await this.api.post(environment.store, '/store/suppliers/delete', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].supplierId == params.supplierId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async unsubscribe(params: any) {
        if (typeof (params.email) == 'undefined' || params.email == null || params.email == '') {
            params.email = this.localstorage.get('email');
        };

        const response = await this.api.post(environment.store, '/store/suppliers/unsubscribe', params);

        if (response.ok) {
            if (params.email == this.localstorage.get('email')) {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].supplierId == params.supplierId) {
                        this.data.splice(i, 1);
                        break;
                    };
                };
            };
        };

        return response;
    };

    public async updatesubscriber(params: any) {
        return await this.api.post(environment.store, '/store/suppliers/updatesubscriber', params);
    };

}