import { MenuService } from 'src/app/services/menu/menu.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-reviews-page',
    styleUrls:      ['./reviews.page.scss'],
    templateUrl:    './reviews.page.html'
})

export class ReviewsPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService) {};

    public loading:         boolean;
    private subscriptions:  any = {};

    ngOnInit(): void {};

    ngOnDestroy(): void {};

}