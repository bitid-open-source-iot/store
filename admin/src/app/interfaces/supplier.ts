import { User } from './user';

export interface Supplier {
    'address'?: {
        'street'?:          string;
        'suburb'?:          string;
        'cityTown'?:        string;
        'postalCode'?:      string;
        'additionalInfo'?:  string;
    };
    'role'?:                number;
    'users'?:               User[];
    'phone'?:               string;
    'email'?:               string;
    'storeId'?:             string;
    'serverDate'?:          string;
    'supplierId'?:          string;
    'description'?:         string;
    'organizationOnly'?:    string;
}