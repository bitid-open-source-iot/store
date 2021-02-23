import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})

export class AccountService {

	public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
	public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService, private router: Router, private localstorage: LocalstorageService) { }

	public async init() {
		const params = {
			filter: [
				'email',
				'picture',
				'username'
			],
			email: this.localstorage.get('email')
		};
		const response = await this.api.post(environment.auth, '/users/get', params);
	}

	public async signup() {
		window.open([environment.auth, '/signup', '?', 'appId=', environment.appId, '&', 'returl=', window.location.origin].join(''), '_parent');
	}

	public async signin() {
		window.open([environment.auth, '/allow-access', '?', 'appId=', environment.appId, '&', 'returl=', window.location.origin, '/authenticate'].join(''), '_parent');
	}

	public async signout() {
		this.localstorage.clear();
		this.authenticated.next(false);
		this.router.navigate(['/home']);
	}

	public async retrieve(params) {
		this.localstorage.set('email', params.email);
		return await this.api.put(environment.auth, '/tokens/retrieve', params);
	}

}

interface User {
	'email': string;
	'picture': string;
	'username': string;
}
