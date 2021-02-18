export class CollectionPoint {

    public role: number;

    constructor(args: COLLECTIONPOINT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
        }
    }

}

interface COLLECTIONPOINT {
    role: number;
}