export class Review {

    public role?: number;
    public store = {
        description: null
    };
    public score?: number;
    public status?: string;
    public product = {
        title: null
    };
    public storeId?: string;
    public message?: string;
    public reviewId?: string;
    public productId?: string;

    constructor(args: REVIEW) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.store) != 'undefined' && args.store != null) {
                if (typeof (args.store.description) != 'undefined' && args.store.description != null) {
                    this.store.description = args.store.description;
                }
            }
            if (typeof (args.product) != 'undefined' && args.product != null) {
                if (typeof (args.product.title) != 'undefined' && args.product.title != null) {
                    this.product.title = args.product.title;
                }
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.role) != 'undefined' && args.role != null) {
                this.role = args.role;
            }
            if (typeof (args.score) != 'undefined' && args.score != null) {
                this.score = args.score;
            }
            if (typeof (args.status) != 'undefined' && args.status != null) {
                this.status = args.status;
            }
            if (typeof (args.storeId) != 'undefined' && args.storeId != null) {
                this.storeId = args.storeId;
            }
            if (typeof (args.message) != 'undefined' && args.message != null) {
                this.message = args.message;
            }
            if (typeof (args.reviewId) != 'undefined' && args.reviewId != null) {
                this.reviewId = args.reviewId;
            }
            if (typeof (args.productId) != 'undefined' && args.productId != null) {
                this.productId = args.productId;
            }
        }
    }

}

interface REVIEW {
    store?: {
        description?: string;
    };
    product?: {
        title?: string;
    };
    role?: number;
    score?: number;
    status?: string;
    storeId?: string;
    message?: string;
    reviewId?: string;
    productId?: string;
}
