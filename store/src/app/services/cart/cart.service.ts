import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    public items:   any[]                       = [];
    public summary: BehaviorSubject<Summary>    = new BehaviorSubject<Summary>({
        'vat':      0,
        'total':    0,
        'subtotal': 0,
        'discount': 0
    });

    constructor(private api: ApiService, private account: AccountService, private localstorage: LocalstorageService) {};

    public async clear() {
        this.items = [];
        this.localstorage.setObject('cart', this.items);
        this.calculate();
        return true;
    };

    public async init() {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/carts/list', {});
    
            if (response.ok) {
                this.items = response.result;
                this.localstorage.setObject('cart', this.items);
            };
        } else {
            this.items = this.localstorage.getObject('cart', []);
        };
        this.calculate();
    };

    public async calculate() {
        let summary: Summary    = {};
        summary.vat             = 0;
        summary.total           = 0;
        summary.subtotal        = 0;
        summary.discount        = 0;
        this.items.map(item => {
            summary.subtotal += item.price * item.quantity;
            if (item.promotion.enabled) {
                summary.discount -= (item.price - item.promotion.price) * item.quantity;
            };
        });
        summary.total  = summary.subtotal + summary.discount;
        summary.vat    = summary.total * 0.15;
        summary.total  = summary.total * 1.15;
        this.summary.next(summary);
    };

    public async add(params: any) {
        if (this.account.authenticated.value) {
            params.quantity = 1;
            const response = await this.api.post(environment.store, '/store/carts/add', params);
    
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
        this.localstorage.setObject('cart', this.items);
        this.calculate();
    };

    public async more(params: any) {
        if (this.account.authenticated.value) {
            params.quantity += 1;
            await this.api.post(environment.store, '/store/carts/update', params);
        } else {
            this.items.map(item => {
                if (item.productId == params.productId) {
                    item.quantity += 1;
                };
            });
        };
        this.localstorage.setObject('cart', this.items);
        this.calculate();
    };

    public async less(params: any) {
        if (this.account.authenticated.value) {
            if (params.quantity > 1) {
                params.quantity -= 1;
                await this.api.post(environment.store, '/store/carts/update', params);
            } else {
                this.delete(params);
            };
        } else {
            if (params.quantity > 1) {
                this.items.map(item => {
                    if (item.productId == params.productId) {
                        item.quantity -= 1;
                    };
                });
            } else {
                this.items = this.items.filter(o => o.productId != params.productId);
            };
        };
        this.localstorage.setObject('cart', this.items);
        this.calculate();
    };

    public async list(params: any) {
        const response = await this.api.post(environment.store, '/store/carts/list', params);

        if (response.ok) {
            this.items = response.result;
            this.localstorage.setObject('cart', this.items);
            this.calculate();
        };

        return response;
    };

    public async update(params: any) {
        if (this.account.authenticated.value) {
            const response = await this.api.post(environment.store, '/store/carts/update', params);
    
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
        this.localstorage.setObject('cart', this.items);
        this.calculate();
    };

    public async delete(params: any) {
        const response = await this.api.post(environment.store, '/store/carts/delete', params);

        if (response.ok) {
            this.items = this.items.filter(o => o.productId != params.productId);
            this.localstorage.setObject('cart', this.items);
            this.calculate();
        };

        return response;
    };

}

interface Summary {
    'vat'?:         number;
    'total'?:       number;
    'subtotal'?:    number;
    'discount'?:    number;
}