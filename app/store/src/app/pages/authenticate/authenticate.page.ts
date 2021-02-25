import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { StoreService } from 'src/app/services/store/store.service';
import { AccountService } from 'src/app/services/account/account.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'authenticate-page',
	styleUrls: ['./authenticate.page.scss'],
	templateUrl: './authenticate.page.html'
})

export class AuthenticatePage implements OnInit, OnDestroy {

	constructor(private title: Title, private route: ActivatedRoute, private store: StoreService, private router: Router, private service: AccountService, private localstorage: LocalstorageService) { }

	public loading: boolean;
	private params: any = {};
	private observers: any = {};

	public async retrieve() {
		this.loading = true;

		const response = await this.service.retrieve(this.params);

		if (response.ok) {
			this.localstorage.setObject('token', response.result.token);
			this.router.navigate(['/home']);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.config = this.store.loaded.subscribe(loaded => {
			if (loaded) {
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
