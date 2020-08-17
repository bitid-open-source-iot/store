import { Input, Component } from '@angular/core';

@Component({
    selector:       'ngx-star-rating',
    styleUrls:      ['./ngx-star-rating.scss'],
    templateUrl:    './ngx-star-rating.html'
})

export class NgxStarRatingComponent {

    @Input('value') public value: number = 0;

}