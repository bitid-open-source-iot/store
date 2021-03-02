import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { CollectionPoint } from 'src/app/classes/collection-point';

@Injectable({
	providedIn: 'root'
})

export class CollectionPointsService {

	public data: CollectionPoint[] = [];

	constructor(private api: ApiService) { }

	public async list(params) {
		return await this.api.post(environment.store, '/store/collection-points/public/list', params);
	}

}
