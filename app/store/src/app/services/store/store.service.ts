import { Store } from 'src/app/classes/store';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class StoreService {

	public logo: BehaviorSubject<string> = new BehaviorSubject<string>('./assets/icons/icon-512x512.png');
	public description: BehaviorSubject<string> = new BehaviorSubject<string>('Online Store');

	constructor(private api: ApiService, private meta: Meta, private title: Title) { }

	public async init() {
		const response = await this.api.put(environment.store, '/store/stores/validate', {});
		
		if (response.ok) {
			const store = new Store(response.result);
			this.logo.next(store.logo);
			this.title.setTitle(store.description);
			this.description.next(store.description);
			const favicon = <HTMLLinkElement>document.getElementById('favicon');
			favicon.href = store.logo;
		};
		
		return response;
	}

}
