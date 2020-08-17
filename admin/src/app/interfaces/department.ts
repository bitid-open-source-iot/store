import { User } from './user';

export interface Department {
    'role'?:                number;
    'users'?:               User[];
    'storeId'?:             string;
    'serverDate'?:          string;
    'description'?:         string;
    'departmentId'?:        string;
    'organizationOnly'?:    string;
}