import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreService } from 'src/app/services/store/store.service';
import { AccountService } from 'src/app/services/account/account.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { PrivateMessageService } from 'src/app/libs/private-message/private-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'authenticate-page',
	styleUrls: ['./authenticate.page.scss'],
	templateUrl: './authenticate.page.html'
})

export class AuthenticatePage implements OnInit, OnDestroy {

	constructor(private title: Title, private popup: PrivateMessageService, private route: ActivatedRoute, private config: StoreService, private router: Router, private service: AccountService, private customers: CustomersService, private localstorage: LocalstorageService) { }

	public store: any;
	public loading: boolean;
	private params: any = {};
	private observers: any = {};

	public async retrieve() {
		this.loading = true;

		const response = await this.service.retrieve(this.params);

		if (response.ok) {
			this.localstorage.setObject('token', response.result.token);
			this.router.navigate(['/home']);

			await this.service.init();

			if (this.store.private) {
				const response = await this.customers.iam({});
				if (response.ok && !response.result) {
					this.popup.show();
				} else if (!response.ok) {
					this.popup.show();
				}
			}
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.config = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.store = (this.config.value as any)._value;
				const params = this.route.snapshot.queryParams;
				this.params = {
					email: params.email,
					tokenId: params.tokenId
				};
				this.retrieve();
				this.title.setTitle([environment.appName, '|', 'Authenticate'].join(' '));
			}
		});
	}

	ngOnDestroy(): void {
		this.observers.config.unsubscribe();
	}

}
