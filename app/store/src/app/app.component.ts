import { ConfigService } from './services/config/config.service';
import { UpdateService } from './libs/update/update.service';
import { AccountService } from './services/account/account.service';
import { OnInit, Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage/localstorage.service';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	constructor(private config: ConfigService, private update: UpdateService, public account: AccountService) {}

	public authenticated: boolean;


	private async initialize() {
		await this.config.init();
		await this.update.init();
	}

	ngOnInit(): void {
		this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				// await this.account.init();
			}
		});

		this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
			if (authenticated) {
				
			}
		});

		this.initialize();
	}

}
