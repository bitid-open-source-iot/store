export class Order {

    public date = {
        paid: null,
        returned: null,
        delivered: null,
        initialized: null
    };
    public vat?: number = 0;
    public email?: string;
    public total?: number = 0;
    public status?: string;
    public orderId?: string;
    public subtotal?: number = 0;

    constructor(args?: ORDER) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.date) != 'undefined' && args.date != null) {
                if (typeof (args.date.paid) != 'undefined' && args.date.paid != null) {
                    this.date.paid = args.date.paid;
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
            if (typeof (args.vat) != 'undefined' && args.vat != null) {
                this.vat = args.vat;
            }
            if (typeof (args.email) != 'undefined' && args.email != null) {
                this.email = args.email;
            }
            if (typeof (args.total) != 'undefined' && args.total != null) {
                this.total = args.total;
            }
            if (typeof (args.status) != 'undefined' && args.status != null) {
                this.status = args.status;
            }
            if (typeof (args.orderId) != 'undefined' && args.orderId != null) {
                this.orderId = args.orderId;
            }
            if (typeof (args.subtotal) != 'undefined' && args.subtotal != null) {
                this.subtotal = args.subtotal;
            }
        }
    }

}

interface ORDER {
    date?: {
        paid?: string;
        returned?: string;
        delivered?: string;
        initialized?: string;
    };
    vat?: number;
    email?: string;
    total?: number;
    status?: string;
    orderId?: string;
    subtotal?: number;
}