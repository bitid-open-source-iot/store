import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class HistoryService {

    private current:    string;
    private previous:   string;

    constructor(private router: Router) {};
    
    public init() {
        this.current = this.router.url;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {        
                this.previous   = this.current;
                this.current    = event.url;
            };
        });
    };

    public async last() {
        return await this.previous;
    };

    public async back() {
        this.router.navigate([this.previous]);
    };

}