export interface Product {
    'promotion'?: {
        'price'?:    number;
        'enabled'?:  boolean;
    };
    'info'?:        Info[];
    'type'?:        string;
    'links'?:       string[];
    'image'?:       string;
    'score'?:       number;
    'price'?:       number;
    'title'?:       string;
    'images'?:      Image[];
    'storeId'?:     string;
    'reviews'?:     number;
    'returned'?:    number;
    'productId'?:   string;
    'purchased'?:   number;
    'supplierId'?:  string;
    'departments'?: string[];
    'description'?: string;
}

export interface Info {
    'title'?: string;
    'value'?: string;
}

export interface Image {
    'src'?:      string;
    'main'?:     boolean;
    'position'?: number;
}