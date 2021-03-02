import { OrderProduct } from "./order-product";

export class Order {

    public date = {
        paid: null,
        sent: null,
        returned: null,
        delivered: null,
        initialized: null
    };
    public payment = {
        vat: 0,
        total: 0,
        credit: 0,
        method: null,
        discount: 0,
        shipping: 0,
        subtotal: 0
    };
    public shipping = {
        address: {
            street: null,
            suburb: null,
            cityTown: null,
            postalCode: null,
            additionalInfo: null
        },
        method: null,
        enabled: false,
        optionId: null,
        courierId: null,
        collectionpointId: null
    };
    public products?: OrderProduct[] = [];
    public recipient = {
        name: {
            last: null,
            first: null
        },
        company: {
            vat: null,
            reg: null,
            name: null
        },
        email: null,
        number: null
    };
    public email?: string;
    public status?: string;
    public storeId?: string;
    public orderId?: string;

    constructor(args?: ORDER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.date) != 'undefined' && args.date != null) {
                if (typeof (args.date.paid) != 'undefined' && args.date.paid != null) {
                    this.date.paid = args.date.paid;
                }
                if (typeof (args.date.sent) != 'undefined' && args.date.sent != null) {
                    this.date.sent = args.date.sent;
                }
                if (typeof (args.date.returned) != 'undefined' && args.date.returned != null) {
                    this.date.returned = args.date.returned;
                }
                if (typeof (args.date.delivered) != 'undefined' && args.date.delivered != null) {
                    this.date.delivered = args.date.delivered;
                }
                if (typeof (args.date.initialized) != 'undefined' && args.date.initialized != null) {
                    this.date.initialized = args.date.initialized;
                }
            }
            if (typeof (args.payment) != 'undefined' && args.payment != null) {
                if (typeof (args.payment.vat) != 'undefined' && args.payment.vat != null) {
                    this.payment.vat = args.payment.vat;
                }
                if (typeof (args.payment.total) != 'undefined' && args.payment.total != null) {
                    this.payment.total = args.payment.total;
                }
                if (typeof (args.payment.credit) != 'undefined' && args.payment.credit != null) {
                    this.payment.credit = args.payment.credit;
                }
                if (typeof (args.payment.method) != 'undefined' && args.payment.method != null) {
                    this.payment.method = args.payment.method;
                }
                if (typeof (args.payment.discount) != 'undefined' && args.payment.discount != null) {
                    this.payment.discount = args.payment.discount;
                }
                if (typeof (args.payment.shipping) != 'undefined' && args.payment.shipping != null) {
                    this.payment.shipping = args.payment.shipping;
                }
                if (typeof (args.payment.subtotal) != 'undefined' && args.payment.subtotal != null) {
                    this.payment.subtotal = args.payment.subtotal;
                }
            }
            if (typeof (args.shipping) != 'undefined' && args.shipping != null) {
                if (typeof (args.shipping.address) != 'undefined' && args.shipping.address != null) {
                    if (typeof (args.shipping.address.street) != 'undefined' && args.shipping.address.street != null) {
                        this.shipping.address.street = args.shipping.address.street;
                    }
                    if (typeof (args.shipping.address.suburb) != 'undefined' && args.shipping.address.suburb != null) {
                        this.shipping.address.suburb = args.shipping.address.suburb;
                    }
                    if (typeof (args.shipping.address.cityTown) != 'undefined' && args.shipping.address.cityTown != null) {
                        this.shipping.address.cityTown = args.shipping.address.cityTown;
                    }
                    if (typeof (args.shipping.address.postalCode) != 'undefined' && args.shipping.address.postalCode != null) {
                        this.shipping.address.postalCode = args.shipping.address.postalCode;
                    }
                    if (typeof (args.shipping.address.additionalInfo) != 'undefined' && args.shipping.address.additionalInfo != null) {
                        this.shipping.address.additionalInfo = args.shipping.address.additionalInfo;
                    }
                }
                if (typeof (args.shipping.method) != 'undefined' && args.shipping.method != null) {
                    this.shipping.method = args.shipping.method;
                }
                if (typeof (args.shipping.enabled) != 'undefined' && args.shipping.enabled != null) {
                    this.shipping.enabled = args.shipping.enabled;
                }
                if (typeof (args.shipping.optionId) != 'undefined' && args.shipping.optionId != null) {
                    this.shipping.optionId = args.shipping.optionId;
                }
                if (typeof (args.shipping.courierId) != 'undefined' && args.shipping.courierId != null) {
                    this.shipping.courierId = args.shipping.courierId;
                }
                if (typeof (args.shipping.collectionpointId) != 'undefined' && args.shipping.collectionpointId != null) {
                    this.shipping.collectionpointId = args.shipping.collectionpointId;
                }
            }
            if (typeof (args.products) != 'undefined' && args.products != null) {
                this.products = args.products.map(o => new OrderProduct(o));
            }
            if (typeof (args.recipient) != 'undefined' && args.recipient != null) {
                if (typeof (args.recipient.name) != 'undefined' && args.recipient.name != null) {
                    if (typeof (args.recipient.name.last) != 'undefined' && args.recipient.name.last != null) {
                        this.recipient.name.last = args.recipient.name.last;
                    }
                    if (typeof (args.recipient.name.first) != 'undefined' && args.recipient.name.first != null) {
                        this.recipient.name.first = args.recipient.name.first;
                    }
                }
                if (typeof (args.recipient.company) != 'undefined' && args.recipient.company != null) {
                    if (typeof (args.recipient.company.vat) != 'undefined' && args.recipient.company.vat != null) {
                        this.recipient.company.vat = args.recipient.company.vat;
                    }
                    if (typeof (args.recipient.company.reg) != 'undefined' && args.recipient.company.reg != null) {
                        this.recipient.company.reg = args.recipient.company.reg;
                    }
                    if (typeof (args.recipient.company.name) != 'undefined' && args.recipient.company.name != null) {
                        this.recipient.company.name = args.recipient.company.name;
                    }
                }
                if (typeof (args.recipient.email) != 'undefined' && args.recipient.email != null) {
                    this.recipient.email = args.recipient.email;
                }
                if (typeof (args.recipient.number) != 'undefined' && args.recipient.number != null) {
                    this.recipient.number = args.recipient.number;
                }
            }
            if (typeof (args.email) != 'undefined' && args.email != null) {
                this.email = args.email;
            }
            if (typeof (args.status) != 'undefined' && args.status != null) {
                this.status = args.status;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.orderId) != 'undefined' && args.orderId != null) {
                this.orderId = args.orderId;
            }
        }
    }

}

interface ORDER {
    date?: {
        paid?: string;
        sent?: string;
        returned?: string;
        delivered?: string;
        initialized?: string;
    };
    payment?: {
        vat?: number;
        total?: number;
        credit?: number;
        method?: string;
        discount?: number;
        shipping?: number;
        subtotal?: number;
    };
    shipping?: {
        address?: {
            street?: string;
            suburb?: string;
            cityTown?: string;
            postalCode?: string;
            additionalInfo?: string;
        },
        method?: string;
        enabled?: boolean;
        optionId?: string;
        courierId?: string;
        collectionpointId?: string;
    };
    products?: OrderProduct[];
    recipient?: {
        name?: {
            last?: string;
            first?: string;
        },
        company?: {
            vat?: string;
            reg?: string;
            name?: string;
        },
        email?: string;
        number?: string;
    };
    email?: string;
    status?: string;
    storeId?: string;
    orderId?: string;
}