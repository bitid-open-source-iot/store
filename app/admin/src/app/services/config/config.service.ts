import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class ConfigService {

	public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService) { }

	public async init() {
		const response = await this.api.put(environment.store, '/store/config/get', {});

		if (response.ok) {
			Object.keys(response.result).map(key => {
				environment[key] = response.result[key];
			});
			this.loaded.next(true);
			return true;
		} else {
			return false;
		}
	}

}
