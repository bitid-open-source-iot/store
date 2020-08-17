import { User } from './user';

export interface Store {
    'contact'?: {
        'email'?:   string;
        'number'?:  string;
        'website'?: string;
    };
    'payfast'?: {
        'merchantId'?:  string;
        'merchantKey'?: string;
    };
    'address'?: {
        'vat'?:         string;
        'reg'?:         string;
        'street'?:      string;
        'suburb'?:      string;
        'cityTown'?:    string;
        'postalCode'?:  string;
    };
    'dns'?:         string[];
    'logo'?:        string;
    'role'?:        number;
    'users'?:       User[];
    'storeId'?:     string;
    'description'?: string;
}