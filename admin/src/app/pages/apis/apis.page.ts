import { MenuService } from 'src/app/services/menu/menu.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-apis-page',
    styleUrls:      ['./apis.page.scss'],
    templateUrl:    './apis.page.html'
})

export class ApisPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService) {};

    public loading:         boolean;
    private subscriptions:  any = {};

    ngOnInit(): void {};

    ngOnDestroy(): void {};

}