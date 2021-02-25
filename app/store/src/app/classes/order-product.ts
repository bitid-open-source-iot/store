export class OrderProduct {

    public expiry = {
        date: null,
        enabled: null
    };
    public location = {
        enabled: null,
        latitude: 0,
        longitude: 0
    };
    public promotion = {
        price: null,
        enabled: null
    };
    public type?: string;
    public score?: number;
    public links?: any[] = [];
    public image?: string;
    public title?: string;
    public price?: number;
    public images?: any[] = [];
    public storeId?: string;
    public reviews?: number;
    public quantity?: number;
    public productId?: string;
    public description?: string;

    constructor(args?: ORDER_PRODUCT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.expiry) != 'undefined' && args.expiry != null) {
                if (typeof (args.expiry.date) != 'undefined' && args.expiry.date != null) {
                    this.expiry.date = args.expiry.date;
                }
                if (typeof (args.expiry.enabled) != 'undefined' && args.expiry.enabled != null) {
                    this.expiry.enabled = args.expiry.enabled;
                }
            }
            if (typeof (args.location) != 'undefined' && args.location != null) {
                if (typeof (args.location.enabled) != 'undefined' && args.location.enabled != null) {
                    this.location.enabled = args.location.enabled;
                }
                if (typeof (args.location.latitude) != 'undefined' && args.location.latitude != null) {
                    this.location.latitude = args.location.latitude;
                }
                if (typeof (args.location.longitude) != 'undefined' && args.location.longitude != null) {
                    this.location.longitude = args.location.longitude;
                }
            }
            if (typeof (args.promotion) != 'undefined' && args.promotion != null) {
                if (typeof (args.promotion.price) != 'undefined' && args.promotion.price != null) {
                    this.promotion.price = args.promotion.price;
                }
                if (typeof (args.promotion.enabled) != 'undefined' && args.promotion.enabled != null) {
                    this.promotion.enabled = args.promotion.enabled;
                }
            }
            if (typeof (args.type) != 'undefined' && args.type != null) {
                this.type = args.type;
            }
            if (typeof (args.score) != 'undefined' && args.score != null) {
                this.score = args.score;
            }
            if (typeof (args.links) != 'undefined' && args.links != null) {
                this.links = args.links;
            }
            if (typeof (args.title) != 'undefined' && args.title != null) {
                this.title = args.title;
            }
            if (typeof (args.price) != 'undefined' && args.price != null) {
                this.price = args.price;
            }
            if (typeof (args.image) != 'undefined' && args.image != null) {
                this.image = args.image;
            }
            if (typeof (args.images) != 'undefined' && args.images != null) {
                this.images = args.images;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.reviews) != 'undefined' && args.reviews != null) {
                this.reviews = args.reviews;
            }
            if (typeof (args.quantity) != 'undefined' && args.quantity != null) {
                this.quantity = args.quantity;
            }
            if (typeof (args.productId) != 'undefined' && args.productId != null) {
                this.productId = args.productId;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
        }
    }

}

interface ORDER_PRODUCT {
    expiry?: {
        date?: string;
        enabled?: boolean;
    };
    location?: {
        enabled?: boolean;
        latitude?: number;
        longitude?: number;
    };
    promotion?: {
        price?: number;
        enabled?: boolean;
    };
    type?: string;
    image?: string;
    score?: number;
    links?: any[];
    title?: string;
    price?: number;
    images?: any[];
    storeId?: string;
    reviews?: number;
    quantity?: number;
    productId?: string;
    description?: string;
}
