import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from '../account/account.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})

export class AuthService implements CanActivate {

	constructor(private account: AccountService, private localstorage: LocalstorageService) { }

	canActivate() {
		const now = new Date();
		let valid = true;
		const email = this.localstorage.get('email');
		const token = this.localstorage.getObject('token');

		if (!email || !token) {
			valid = false;
		} else {
			if (typeof (token.expiry) != 'undefined') {
				const expiry = new Date(token.expiry);
				if (expiry < now) {
					valid = false;
				}
			} else {
				valid = false;
			}
		}
		if (this.account.authenticated.value != valid) {
			this.account.authenticated.next(valid);
		}
		if (valid) {
			return true;
		} else {
			this.account.signout();
		}
	}
}
