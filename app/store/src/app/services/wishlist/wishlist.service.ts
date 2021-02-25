import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class WishlistService {

    public items: any[] = [];
    public count: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(private api: ApiService, private account: AccountService, private localstorage: LocalstorageService) {};

    public async init() {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/wishlists/list', {});
    
            if (response.ok) {
                this.items = response.result;
                this.localstorage.setObject('wishlist', this.items);
            };
        } else {
            this.items = this.localstorage.getObject('wishlist', []);
        };
        this.count.next(this.items.length);
    };

    public async add(params: any) {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/wishlists/add', params);
    
            if (response.ok) {
                let found: boolean;
                this.items.map(item => {
                    if (item.productId == params.productId) {
                        found = true;
                        item.quantity += 1;
                    };
                });
                if (!found) {
                    this.items.push({
                        'title':        params.title,
                        'price':        params.price,
                        'image':        params.image,
                        'storeId':      params.storeId,
                        'quantity':     1,
                        'promotion':    params.promotion,
                        'productId':    params.productId
                    });
                };
            };
        } else {
            let found: boolean;
            this.items.map(item => {
                if (item.productId == params.productId) {
                    found = true;
                    item.quantity += 1;
                };
            });
            if (!found) {
                this.items.push({
                    'title':        params.title,
                    'price':        params.price,
                    'image':        params.image,
                    'storeId':      params.storeId,
                    'quantity':     1,
                    'promotion':    params.promotion,
                    'productId':    params.productId
                });
            };
        };
        this.localstorage.setObject('wishlist', this.items);
        this.count.next(this.items.length);
    };

    public async list(params: any) {
        const response = await this.api.post(environment.store, '/store/wishlists/list', params);

        if (response.ok) {
            this.items = response.result;
        };
        this.count.next(this.items.length);

        return response;
    };

    public async update(params: any) {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/wishlists/update', params);
    
            if (response.ok) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].productId == params.productId) {
                        this.items[i].quantity = params.quantity;
                        break;
                    };
                };
            };
        } else {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].productId == params.productId) {
                    this.items[i].quantity = params.quantity;
                    break;
                };
            };
        };
        this.localstorage.setObject('wishlist', this.items);
        this.count.next(this.items.length);
    };

    public async delete(params: any) {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/wishlists/delete', params);
            
            if (response.ok) {
                this.items = this.items.filter(o => o.productId != params.productId);
            };
        } else {
            this.items = this.items.filter(o => o.productId != params.productId);
        };
        
        this.localstorage.setObject('wishlist', this.items);
        this.count.next(this.items.length);
    };

    public includes(productId: string) {
        return this.items.map(o => o.productId).includes(productId);
    };

}