import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor() {};

    public menu:   MatSidenav;
    public opened:  boolean;
    public change: Subject<string> = new Subject();

    public init(menu) {
        this.menu = menu;
    };

    public close() {
        this.menu.close();
        this.opened = false;
    };

    public toggle() {
        this.menu.toggle();
        if (this.menu.opened) {
            this.opened = true;
        } else {
            this.opened = false;
        };
    };

    public default() {
        this.menu.open();
        this.opened = true;
    };

}