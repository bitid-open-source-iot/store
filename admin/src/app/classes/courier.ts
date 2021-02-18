export class Courier {

    public role: number;

    constructor(args: COURIER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface COURIER {
    role: number;
}