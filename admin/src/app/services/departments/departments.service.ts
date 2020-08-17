import { Injectable } from '@angular/core';
import { Department } from 'src/app/interfaces/department';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class DepartmentsService {

    public data: Department[] = [];

    constructor(private api: ApiService, private localstorage: LocalstorageService) {};

    public async add(params: any) {
        const response = await this.api.post(environment.store, '/store/departments/add', params);

        if (response.ok) {
            params.departmentId = response.result.departmentId;
            this.data.push(params);
        };

        return response;
    };

    public async get(params: any) {
        return await this.api.post(environment.store, '/store/departments/get', params);
    };

    public async list(params: any) {
        return await this.api.put(environment.store, '/store/departments/list', params);
    };

    public async share(params: any) {
        return await this.api.post(environment.store, '/store/departments/share', params);
    };

    public async update(params: any) {
        const response = await this.api.post(environment.store, '/store/departments/update', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].departmentId == params.departmentId) {
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
        const response = await this.api.post(environment.store, '/store/departments/delete', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].departmentId == params.departmentId) {
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

        const response = await this.api.post(environment.store, '/store/departments/unsubscribe', params);

        if (response.ok) {
            if (params.email == this.localstorage.get('email')) {
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].departmentId == params.departmentId) {
                        this.data.splice(i, 1);
                        break;
                    };
                };
            };
        };

        return response;
    };

    public async updatesubscriber(params: any) {
        return await this.api.post(environment.store, '/store/departments/updatesubscriber', params);
    };

}