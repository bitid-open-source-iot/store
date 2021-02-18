export class Order {

    public role: number;

    constructor(args: ORDER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface ORDER {
    role: number;
}