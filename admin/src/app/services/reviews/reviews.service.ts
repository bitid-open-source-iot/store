import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ReviewsService {

	constructor(private api: ApiService) { }

	public async list(params) {
		return await this.api.post(environment.store, '/store/reviews/list', params);
	}

}