export class Voucher {

    public role?: number;
    public code?: string;
    public storeId?: string;
    public productId?: string;
    public voucherId?: string;
    public description?: string;

    constructor(args?: VOUCHER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.code) != 'undefined' && args.code != null) {
                this.code = args.code;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.productId) != 'undefined' && args.productId != null) {
                this.productId = args.productId;
            }
            if (typeof (args.voucherId) != 'undefined' && args.voucherId != null) {
                this.voucherId = args.voucherId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
        }
    }

}

interface VOUCHER {
    role?: number;
    code?: string;
    storeId?: string;
    productId?: string;
    voucherId?: string;
    description?: string;
}
