export class CollectionPoint {

    public address = {
        street: '',
        suburb: '',
        country: '',
        cityTown: '',
        postalCode: ''
    };
    public role?: number;
    public storeId?: string;
    public description?: string;
    public collectionpointId?: string;

    constructor(args?: COLLECTIONPOINT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.address) != 'undefined' && args.address != null) {
                if (typeof (args.address.street) != 'undefined' && args.address.street != null) {
                    this.address.street = args.address.street;
                }
                if (typeof (args.address.suburb) != 'undefined' && args.address.suburb != null) {
                    this.address.suburb = args.address.suburb;
                }
                if (typeof (args.address.country) != 'undefined' && args.address.country != null) {
                    this.address.country = args.address.country;
                }
                if (typeof (args.address.cityTown) != 'undefined' && args.address.cityTown != null) {
                    this.address.cityTown = args.address.cityTown;
                }
                if (typeof (args.address.postalCode) != 'undefined' && args.address.postalCode != null) {
                    this.address.postalCode = args.address.postalCode;
                }
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
            if (typeof (args.collectionpointId) != 'undefined' && args.collectionpointId != null) {
                this.collectionpointId = args.collectionpointId;
            }
        }
    }

}

interface COLLECTIONPOINT {
    address?: {
        street?: string
        suburb?: string
        country?: string
        cityTown?: string
        postalCode?: string
    };
    role?: number;
    storeId?: string;
    description?: string;
    collectionpointId?: string;
}