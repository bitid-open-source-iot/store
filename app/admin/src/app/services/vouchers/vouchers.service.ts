import { Voucher } from 'src/app/classes/voucher';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class VouchersService {

    public data: Voucher[] = [];

    constructor(private api: ApiService) { }

    public async add(params) {
        return await this.api.post(environment.store, '/store/vouchers/add', params);
    }

    public async get(params) {
        return await this.api.post(environment.store, '/store/vouchers/get', params);
    }

    public async list(params) {
        return await this.api.post(environment.store, '/store/vouchers/list', params);
    }

    public async update(params) {
        return await this.api.post(environment.store, '/store/vouchers/update', params);
    }

    public async delete(params) {
        return await this.api.post(environment.store, '/store/vouchers/delete', params);
    }

}
