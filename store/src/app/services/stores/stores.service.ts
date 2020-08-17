import { Store } from 'src/app/interfaces/store';
import { Injectable } from '@angular/core';
import { ApiService } from './../api/api.service';
import { environment } from './../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StoresService {

    public store: BehaviorSubject<Store>  = new BehaviorSubject(null);

    constructor(private api: ApiService) {};

    public async init() {
        const params = {
            'dns': window.location.host
        };

        const response = await this.api.put(environment.store, '/store/stores/validate', params);

        if (response.ok) {
            this.store.next(response.result);
        };

        return response;
    };

}