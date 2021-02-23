export class Customer {

    public role?: number;
    public email?: string;
    public storeId?: string;
    public customerId?: string;

    constructor(args?: CUSTOMER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.email) != 'undefined' && args.email != null) {
                this.email = args.email;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.customerId) != 'undefined' && args.customerId != null) {
                this.customerId = args.customerId;
            }
        }
    }

}

interface CUSTOMER {
    role?: number;
    email?: string;
    storeId?: string;
    customerId?: string;
}
