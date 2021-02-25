import { Store } from 'src/app/classes/store';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class StoreService {

	public value: BehaviorSubject<Store> = new BehaviorSubject<Store>(null);
	public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService, private title: Title) { }

	public async init() {
		const response = await this.api.put(environment.store, '/store/stores/load', {});
		
		if (response.ok) {
			const store = new Store(response.result);
			environment.appId = store.appId;
			this.value.next(store);
			this.title.setTitle(store.description);
			const favicon = <HTMLLinkElement>document.getElementById('favicon');
			favicon.href = store.logo;
			this.loaded.next(true);
		} else {
			this.loaded.next(false);
		};
		
		return response;
	}

}
