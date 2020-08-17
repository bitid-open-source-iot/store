import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-subscribers-dialog',
	styleUrls: ['./subscribers.dialog.scss'],
	templateUrl: './subscribers.dialog.html'
})

export class SubscribersDialog implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) private data: SubscribersParams, private dialog: MatDialogRef<SubscribersDialog>, private toast: ToastService) { };

	public role: number = 0;
	public users: any = new MatTableDataSource();
	public roles: any[] = environment.roles;
	public columns: string[] = ['email', 'role', 'remove'];
	public loading: boolean;

	public close() {
		this.dialog.close(false);
	};

	private async get() {
		this.loading = true;

		let params: any = {
			'filter': [
				'role',
				'users'
			],
			'storeId': this.data.storeId
		};

		switch (this.data.type) {
			case ('store'):
				break;
			case ('courier'):
				params.courierId = this.data.id;
				break;
			case ('product'):
				params.productId = this.data.id;
				break;
			case ('supplier'):
				params.supplierId = this.data.id;
				break;
			case ('department'):
				params.departmentId = this.data.id;
				break;
			case ('collectionpoint'):
				params.collectionpointId = this.data.id;
				break;
		};

		const response = await this.data.service.get(params)

		this.loading = false;

		if (response.ok) {
			this.role = response.result.role;
			this.users.data = response.result.users;
		} else {
			this.toast.error('There was an issue loading subscribers');
		};
	};

	public async remove(email) {
		this.loading = true;

		let params: any = {
			'email': email,
			'storeId': this.data.storeId
		};

		switch (this.data.type) {
			case ('store'):
				break;
			case ('courier'):
				params.courierId = this.data.id;
				break;
			case ('product'):
				params.productId = this.data.id;
				break;
			case ('supplier'):
				params.supplierId = this.data.id;
				break;
			case ('department'):
				params.departmentId = this.data.id;
				break;
			case ('collectionpoint'):
				params.collectionpointId = this.data.id;
				break;
		};

		const response = await this.data.service.unsubscribe(params);

		this.loading = false;

		if (response.ok) {
			this.toast.success('User removed!');

			for (let i = 0; i < this.users.data.length; i++) {
				if (this.users.data[i].email == email) {
					this.users.data.splice(i, 1);
					break;
				};
			};

			this.users.data = JSON.parse(JSON.stringify(this.users.data));
		} else {
			this.toast.error('There was an issue removing user!');
		};
	};

	public async update(email, role) {
		this.loading = true;

		let params: any = {
			'role': role,
			'email': email,
			'storeId': this.data.storeId
		};

		switch (this.data.type) {
			case ('store'):
				break;
			case ('courier'):
				params.courierId = this.data.id;
				break;
			case ('product'):
				params.productId = this.data.id;
				break;
			case ('supplier'):
				params.supplierId = this.data.id;
				break;
			case ('department'):
				params.departmentId = this.data.id;
				break;
			case ('collectionpoint'):
				params.collectionpointId = this.data.id;
				break;
		};

		const response = await this.data.service.updatesubscriber(params);

		this.loading = false;

		if (response.ok) {
			this.toast.success('User updated!');
		} else {
			this.toast.error('There was an issue updating user!');
		};
	};

	ngOnInit() {
		this.get();
	};
}

interface SubscribersParams {
	'id': string;
	'type': string;
	'storeId': string;
	'service': any;
}