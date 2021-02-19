export class Supplier {

    public address = {
        street: '',
        suburb: '',
        country: '',
        cityTown: '',
        postalCode: '',
        additionalInfo: ''
    };
    public role?: number;
    public phone?: string;
    public email?: string;
    public storeId?: string;
    public supplierId?: string;
    public description?: string;

    constructor(args?: SUPPLIER) {
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
                if (typeof (args.address.additionalInfo) != 'undefined' && args.address.additionalInfo != null) {
                    this.address.additionalInfo = args.address.additionalInfo;
                }
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.phone) != 'undefined' && args.phone != null) {
                this.phone = args.phone;
            }
            if (typeof (args.email) != 'undefined' && args.email != null) {
                this.email = args.email;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.supplierId) != 'undefined' && args.supplierId != null) {
                this.supplierId = args.supplierId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
        }
    }

}

interface SUPPLIER {
    address?: {
        street?: string
        suburb?: string
        country?: string
        cityTown?: string
        postalCode?: string
        additionalInfo?: string
    };
    role?: number;
    phone?: string;
    email?: string;
    storeId?: string;
    supplierId?: string;
    description?: string;
}