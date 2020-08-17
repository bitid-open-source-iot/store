import { Review } from 'src/app/interfaces/review';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ReviewsService {

    public data: Review[] = [];

    constructor(private api: ApiService) {};

    public async list(params) {
        return await this.api.post(environment.store, '/store/reviews/list', params);
    };

    public async reject(params) {
        return await this.api.post(environment.store, '/store/reviews/reject', params);
    };

    public async approve(params) {
        return await this.api.post(environment.store, '/store/reviews/approve', params);
    };
    
}