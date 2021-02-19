import { User } from './user';

export class Courier {

    public role?: number;
    public icon?: string;
    public users?: User[];
    public phone?: string;
    public email?: string;
    public storeId?: string;
    public options?: any[] = [];
    public account?: string;
    public courierId?: string;
    public description?: string;
    public organizationOnly?: number;

    constructor(args?: COURIER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.icon) != 'undefined' && args.icon != null) {
                this.icon = args.icon;
            }
            if (typeof (args.users) != 'undefined' && args.users != null) {
                this.users = args.users.map(o => new User(o));
            }
            if (typeof (args.phone) != 'undefined' && args.phone != null) {
                this.phone = args.phone;
            }
            if (typeof (args.email) != 'undefined' && args.email != null) {
                this.email = args.email;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.options) != 'undefined' && args.options != null) {
                this.options = args.options;
            }
            if (typeof (args.account) != 'undefined' && args.account != null) {
                this.account = args.account;
            }
            if (typeof (args.courierId) != 'undefined' && args.courierId != null) {
                this.courierId = args.courierId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
            if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
                this.organizationOnly = args.organizationOnly;
            }
        }
    }

}

interface COURIER {
    role?: number;
    icon?: string;
    users?: User[];
    phone?: string;
    email?: string;
    storeId?: string;
    options?: any[];
    account?: string;
    courierId?: string;
    description?: string;
    organizationOnly?: number;
}
