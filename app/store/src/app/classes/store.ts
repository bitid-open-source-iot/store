import { User } from './user';

export class Store {

    public address = {
        vat: '',
        reg: '',
        street: '',
        suburb: '',
        country: '',
        cityTown: '',
        postalCode: ''
    };
    public contact = {
        email: '',
        number: '',
        website: ''
    };
    public payfast = {
        merchantId: '',
        merchantKey: ''
    };
    public dns?: string[] = [];
    public maps?: boolean;
    public role?: number;
    public logo?: string;
    public appId?: string;
    public users?: User[];
    public cover?: string;
    public private?: boolean;
    public storeId?: string;
    public description?: string;
    public organizationOnly?: number;

    constructor(args?: STORE) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.address) != 'undefined' && args.address != null) {
                if (typeof (args.address.vat) != 'undefined' && args.address.vat != null) {
                    this.address.vat = args.address.vat;
                }
                if (typeof (args.address.reg) != 'undefined' && args.address.reg != null) {
                    this.address.reg = args.address.reg;
                }
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
            if (typeof (args.contact) != 'undefined' && args.contact != null) {
                if (typeof (args.contact.email) != 'undefined' && args.contact.email != null) {
                    this.contact.email = args.contact.email;
                }
                if (typeof (args.contact.number) != 'undefined' && args.contact.number != null) {
                    this.contact.number = args.contact.number;
                }
                if (typeof (args.contact.website) != 'undefined' && args.contact.website != null) {
                    this.contact.website = args.contact.website;
                }
            }
            if (typeof (args.payfast) != 'undefined' && args.payfast != null) {
                if (typeof (args.payfast.merchantId) != 'undefined' && args.payfast.merchantId != null) {
                    this.payfast.merchantId = args.payfast.merchantId;
                }
                if (typeof (args.payfast.merchantKey) != 'undefined' && args.payfast.merchantKey != null) {
                    this.payfast.merchantKey = args.payfast.merchantKey;
                }
            }
            if (typeof (args.dns) != 'undefined' && args.dns != null) {
                this.dns = args.dns;
            }
            if (typeof (args.maps) != 'undefined' && args.maps != null) {
                this.maps = args.maps;
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.logo) != 'undefined' && args.logo != null) {
                this.logo = args.logo;
            }
            if (typeof (args.cover) != 'undefined' && args.cover != null) {
                this.cover = args.cover;
            }
            if (typeof (args.users) != 'undefined' && args.users != null) {
                this.users = args.users.map(o => new User(o));
            }
            if (typeof (args.appId) != 'undefined' && args.appId != null) {
                this.appId = args.appId;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.private) != 'undefined' && args.private != null) {
                this.private = args.private;
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
    address?: {
        vat?: string;
        reg?: string;
        street?: string;
        suburb?: string;
        country?: string;
        cityTown?: string;
        postalCode?: string;
    };
    contact?: {
        email?: string;
        number?: string;
        website?: string;
    };
    payfast?: {
        merchantId?: string;
        merchantKey?: string;
    };
    dns?: string[];
    maps?: boolean;
    role?: number;
    logo?: string;
    appId?: string;
    users?: User[];
    cover?: string;
    private?: boolean;
    storeId?: string;
    description?: string;
    organizationOnly?: number;
}
