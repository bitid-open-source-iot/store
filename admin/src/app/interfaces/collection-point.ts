import { User } from './user';

export interface CollectionPoint {
    'address'?: {
        'type'?:            string;
        'street'?:          string;
        'suburb'?:          string;
        'cityTown'?:        string;
        'postalCode'?:      string;
        'additionalInfo'?:  string;
    };
    'role'?:                number;
    'users'?:               User[];
    'storeId'?:             string;
    'serverDate'?:          string;
    'description'?:         string;
    'collectionpointId'?:   string;
}