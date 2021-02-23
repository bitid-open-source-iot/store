import { Input, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'mat-stars',
	styleUrls: ['./stars.component.scss'],
	templateUrl: './stars.component.html',
	encapsulation: ViewEncapsulation.None
})

export class StarsComponent {

	@Input('size') public size: number = 16;
	@Input('value') public value: number = 0;

}