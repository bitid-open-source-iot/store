import { Injectable } from '@angular/core';

@Injectable()

export class LocalstorageService {
    set(key, value) {
        window.localStorage.setItem(key, value);
    };

    get(key) {
        return window.localStorage.getItem(key);
    };

    setObject(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value || {}));
    };

    getObject(key, value?) {
        let result = window.localStorage.getItem(key);
        if (typeof(result) != 'undefined' && result !== null) {
            return JSON.parse(result);
        } else {
            return value;
        };
    };

    clear() {
        window.localStorage.clear();
    };

    remove(key) {
        window.localStorage.removeItem(key);
    };
}