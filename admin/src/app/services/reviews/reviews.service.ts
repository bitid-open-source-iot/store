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
        return await this.api.put(environment.store, '/store/reviews/list', params);
    };

    public async reject(params) {
        const response = await this.api.post(environment.store, '/store/reviews/reject', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].reviewId == params.reviewId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async approve(params) {
        const response = await this.api.post(environment.store, '/store/reviews/approve', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].reviewId == params.reviewId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };
    
}