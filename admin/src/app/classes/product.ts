export class Product {

    public promotion = {
        price: null,
        enabled: null
    };
    public role?: number;
    public cost?: number;
    public info?: any[] = [];
    public type?: string;
    public score?: number;
    public links?: any[] = [];
    public title?: string;
    public price?: number;
    public images?: any[] = [];
    public visible?: boolean;
    public storeId?: string;
    public reviews?: number;
    public quantity?: number;
    public productId?: string;
    public supplierId?: string;
    public departments?: string[] = [];
    public description?: string;

    constructor(args?: PRODUCT) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.promotion) != 'undefined' && args.promotion != null) {
                if (typeof (args.promotion.price) != 'undefined' && args.promotion.price != null) {
                    this.promotion.price = args.promotion.price;
                }
                if (typeof (args.promotion.enabled) != 'undefined' && args.promotion.enabled != null) {
                    this.promotion.enabled = args.promotion.enabled;
                }
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.cost) != 'undefined' && args.cost != null) {
                this.cost = args.cost;
            }
            if (typeof (args.info) != 'undefined' && args.info != null) {
                this.info = args.info;
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
            if (typeof (args.images) != 'undefined' && args.images != null) {
                this.images = args.images;
            }
            if (typeof (args.visible) != 'undefined' && args.visible != null) {
                this.visible = args.visible;
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
            if (typeof (args.supplierId) != 'undefined' && args.supplierId != null) {
                this.supplierId = args.supplierId;
            }
            if (typeof (args.departments) != 'undefined' && args.departments != null) {
                this.departments = args.departments;
            }
            if (typeof (args.description) != 'undefined' && args.description != null) {
                this.description = args.description;
            }
        }
    }

}

interface PRODUCT {
    promotion?: {
        price?: number;
        enabled?: boolean;
    };
    role?: number;
    cost?: number;
    info?: any[];
    type?: string;
    score?: number;
    links?: any[];
    title?: string;
    price?: number;
    images?: any[];
    visible?: boolean;
    storeId?: string;
    reviews?: number;
    quantity?: number;
    productId?: string;
    supplierId?: string;
    departments?: string[];
    description?: string;
}