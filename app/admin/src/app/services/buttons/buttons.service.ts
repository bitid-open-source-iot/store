import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class ButtonsService {

	constructor() { }

	public add: BUTTON = {
		click: new Subject<MouseEvent | TouchEvent>(),
		visible: new BehaviorSubject(false)
	};

	public close: BUTTON = {
		click: new Subject<MouseEvent | TouchEvent>(),
		visible: new BehaviorSubject(false)
	};

	public filter: BUTTON = {
		click: new Subject<MouseEvent | TouchEvent>(),
		visible: new BehaviorSubject(false)
	};

	public search: BUTTON = {
		click: new Subject<MouseEvent | TouchEvent>(),
		reset: new Subject<MouseEvent | TouchEvent>(),
		value: new Subject<string>(),
		visible: new BehaviorSubject(false)
	};

	public show(button) {
		this[button].visible.next(true);
	}

	public hide(button) {
		this[button].visible.next(false);
	}

	public reset(button) {
		this[button].reset.next(false);
	}

}

interface BUTTON {
	'click': Subject<MouseEvent | TouchEvent>;
	'value'?: Subject<string>;
	'reset'?: Subject<MouseEvent | TouchEvent>;
	'visible': BehaviorSubject<boolean>;
}
