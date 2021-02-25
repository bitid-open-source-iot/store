import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AppsService {

    public data: any[] = [];

    constructor(private api: ApiService) { }

    public async list(params) {
        return await this.api.post(environment.auth, '/apps/list', params);
    }

}
