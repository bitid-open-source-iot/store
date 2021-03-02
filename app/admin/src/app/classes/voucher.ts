import { Utility, UTILITY } from "./utility";

export class Voucher extends Utility {

    public file?: string;
    public role?: number;
    public code?: string;
    public status?: string;
    public storeId?: string;
    public productId?: string;
    public voucherId?: string;
    public description?: string;

    constructor(args?: VOUCHER) {
        super(args);
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.code) != 'undefined' && args.code != null) {
                this.code = args.code;
            }
            if (typeof (args.file) != 'undefined' && args.file != null) {
                this.file = args.file;
            }
            if (typeof (args.status) != 'undefined' && args.status != null) {
                this.status = args.status;
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

interface VOUCHER extends UTILITY {
    file?: string;
    role?: number;
    code?: string;
    status?: string;
    storeId?: string;
    productId?: string;
    voucherId?: string;
    description?: string;
}
