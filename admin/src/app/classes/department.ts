import { User } from "./user";

export class Department {

    public role?: number;
    public users?: User[];
    public storeId?: string;
    public description?: string;
    public departmentId?: string;
    public organizationOnly?: number;

    constructor(args: DEPARTMENT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.users) != 'undefined' && args.users != null) {
                this.users = args.users.map(o => new User(o));
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
            if (typeof (args.departmentId) != 'undefined' && args.departmentId != null) {
                this.departmentId = args.departmentId;
            }
            if (typeof (args.organizationOnly) != 'undefined' && args.organizationOnly != null) {
                this.organizationOnly = args.organizationOnly;
            }
        }
    }

}

interface DEPARTMENT {
    role?: number;
    users?: User[];
    storeId?: string;
    description?: string;
    departmentId?: string;
    organizationOnly?: number;
}