import { User } from './user';
import { Utilities } from './utilities';

export interface Product extends Utilities {
    'promotion'?: {
        'price'?:    number;
        'enabled'?:  boolean;
    };
    'info'?:        Info[];
    'role'?:        number;
    'type'?:        string;
    'users'?:       User[];
    'links'?:       string[];
    'image'?:       string;
    'score'?:       number;
    'price'?:       number;
    'title'?:       string;
    'images'?:      Image[];
    'visible'?:     boolean;
    'storeId'?:     string;
    'reviews'?:     number;
    'returned'?:    number;
    'productId'?:   string;
    'purchased'?:   number;
    'supplierId'?:  string;
    'departments'?: string[];
    'description'?: string;
}

export interface Info {
    'title'?: string;
    'value'?: string;
}

export interface Image {
    'src'?:      string;
    'main'?:     boolean;
    'position'?: number;
}