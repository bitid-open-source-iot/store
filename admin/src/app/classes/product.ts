export class Product {

    public role: number;

    constructor(args: PRODUCT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface PRODUCT {
    role: number;
}