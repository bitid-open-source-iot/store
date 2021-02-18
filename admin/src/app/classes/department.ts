export class Department {

    public role: number;

    constructor(args: DEPARTMENT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface DEPARTMENT {
    role: number;
}