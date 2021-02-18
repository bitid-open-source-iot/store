export class Review {

    public role: number;

    constructor(args: REVIEW) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface REVIEW {
    role: number;
}