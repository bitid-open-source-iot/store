import { User } from './user';

export interface Courier {
    'icon'?:                string;
    'role'?:                number;
    'phone'?:               string;
    'users'?:               User[];
    'email'?:               string;
    'storeId'?:             string;
    'options'?:             Option[];
    'account'?:             string;
    'courierId'?:           string;
    'serverDate'?:          string;
    'description'?:         string;
    'organizationOnly'?:    string;
}

interface Option {
    'price'?:       string;
    'description'?: string;
}