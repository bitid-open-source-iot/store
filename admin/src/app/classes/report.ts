export class Report {

    public role: number;

    constructor(args: REPORT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface REPORT {
    role: number;
}