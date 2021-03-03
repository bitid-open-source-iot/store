import { MatDialogRef } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { OnInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'private-message-dialog',
	styleUrls: ['./private-message.dialog.scss'],
	templateUrl: './private-message.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class PrivateMessageDialog implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private dialog: MatDialogRef<PrivateMessageDialog>, public account: AccountService, public config: StoreService) { }

	public authenticated: boolean;
	private subscriptions: any = {};

	public async request() {
		const response = await this.account.requestaccess({
			'storeId': this.config.value.value.storeId
		});
		
		if (response.ok) {
			this.toast.success('Access was requested!');	
		} else {
			this.toast.success(response.error.message);	
		}
	}

	ngOnInit(): void {
		this.subscriptions.authenticated = this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
		});
	};

	ngOnDestroy(): void {
		this.subscriptions.authenticated.unsubscribe();
	};

}