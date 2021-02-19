import { User } from "./user";

export class Department {

    public role?: number;
    public storeId?: string;
    public description?: string;
    public departmentId?: string;

    constructor(args?: DEPARTMENT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
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
        }
    }

}

interface DEPARTMENT {
    role?: number;
    storeId?: string;
    description?: string;
    departmentId?: string;
}