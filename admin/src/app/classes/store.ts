export class Store {

    public role?: number;
    public description?: string;
    public organizationOnly?: string;

    constructor(args?: STORE) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
            if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
                this.organizationOnly = args.organizationOnly;
            }
        }
    }

}

interface STORE {
    role?: number;
description?: string;
organizationOnly?: string;
}