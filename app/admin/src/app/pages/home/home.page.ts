import { AccountService } from 'src/app/services/account/account.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'home-page',
    styleUrls: ['./home.page.scss'],
    templateUrl: './home.page.html'
})

export class HomePage implements OnInit, OnDestroy {

    constructor(public account: AccountService) { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }

}
