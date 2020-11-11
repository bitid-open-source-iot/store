import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ReportsService {

    public data: any[] = [];

    constructor(private api: ApiService) {};

    public async sales(params: any) {
        return await this.api.post(environment.store, '/store/reports/sales', params);
    };

}