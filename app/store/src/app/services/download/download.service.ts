import { Order } from 'src/app/classes/order';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class DownloadService {

	constructor(private api: ApiService) { }

	public async invoice(params) {
		return await this.api.post(environment.store, '/store/download/invoice', params);
	}

}
