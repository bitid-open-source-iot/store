import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'private-message-dialog',
	styleUrls: ['./private-message.dialog.scss'],
	templateUrl: './private-message.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class PrivateMessageDialog implements OnInit, OnDestroy {

	constructor(private dialog: MatDialogRef<PrivateMessageDialog>, public account: AccountService) { }

	public authenticated: boolean;
	private subscriptions: any = {};

	ngOnInit(): void {
		this.subscriptions.authenticated = this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
		});
	};

	ngOnDestroy(): void {
		this.subscriptions.authenticated.unsubscribe();
	};

}