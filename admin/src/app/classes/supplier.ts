export class Supplier {

    public role: number;

    constructor(args: SUPPLIER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface SUPPLIER {
    role: number;
}