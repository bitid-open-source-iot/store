import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Store } from 'src/app/classes/store';
import { Router } from '@angular/router';
import { convert } from 'src/app/classes/convert-image';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'cart-page',
    styleUrls: ['./cart.page.scss'],
    templateUrl: './cart.page.html'
})

export class CartPage implements OnInit, OnDestroy {

    constructor(public cart: CartService, private toast: ToastService, private config: StoreService, private orders: OrdersService, private router: Router, private account: AccountService, private buttons: ButtonsService, private products: ProductsService) { }

    public store: Store = new Store();
    public loading: boolean;
    private subscriptions: any = {};

    public async list() {
        this.loading = true;

        if (this.account.authenticated.value) {
            await this.cart.list({});
        } else {
            const products = await this.products.list({
                'filter': [
                    'title',
                    'price',
                    'image',
                    'storeId',
                    'quantity',
                    'productId',
                    'promotion'
                ],
                'productId': this.cart.items.map(o => o.productId)
            });

            if (products.ok) {
                for (let i = 0; i < this.cart.items.length; i++) {
                    products.result.map(item => {
                        if (this.cart.items[i].productId == item.productId) {
                            if (this.cart.items[i].quantity > item.quantity) {
                                this.cart.items[i].quantity = item.quantity;
                            };
                            this.cart.items[i].max = item.quantity;
                            this.cart.items[i].title = item.title;
                            this.cart.items[i].price = item.price;
                            this.cart.items[i].image = item.image;
                            this.cart.items[i].storeId = item.storeId;
                            this.cart.items[i].promotion = item.promotion;
                        };
                    });
                };
                this.cart.calculate();
            };
        };

        this.loading = false;
    };

    public async checkout() {
        this.loading = true;

        const response = await this.orders.initialize({});

        if (response.ok) {
            this.router.navigate(['/checkout'], {
                queryParams: {
                    orderId: response.result.orderId
                }
            });
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    public async download() {
        convert(this.store.logo, logo => {
            let content: any = [
                {
                    margin: [0, 0, 0, 20],
                    columns: [
                        {
                            width: '*',
                            table: {
                                body: [
                                    [
                                        {
                                            width: 50,
                                            image: logo,
                                            border: [false, false, false, false]
                                        }
                                    ],
                                    [
                                        {
                                            text: this.store.description,
                                            bold: true,
                                            border: [false, false, false, false],
                                            fontSize: 18
                                        }
                                    ],
                                    [
                                        {
                                            text: this.store.address.street.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ],
                                    [
                                        {
                                            text: this.store.address.suburb.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ],
                                    [
                                        {
                                            text: this.store.address.cityTown.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ],
                                    [
                                        {
                                            text: this.store.address.postalCode.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ],
                                    [
                                        {
                                            text: 'VAT: ' + this.store.address.vat.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ],
                                    [
                                        {
                                            text: 'REG: ' + this.store.address.reg.toUpperCase(),
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            width: 'auto',
                            table: {
                                body: [
                                    [
                                        {
                                            text: 'DATE',
                                            bold: true,
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        },
                                        {
                                            text: moment().format('YYYY/MM/DD'),
                                            border: [false, false, false, false],
                                            fontSize: 10,
                                            alignment: 'right'
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                },
                {
                    margin: [0, 0, 0, 20],
                    table: {
                        body: [
                            [
                                {
                                    text: 'DESCRIPTION',
                                    bold: true,
                                    margin: [0, 0, 10, 0],
                                    border: [false, false, false, true],
                                    fontSize: 10
                                },
                                {
                                    text: 'QTY',
                                    bold: true,
                                    margin: [0, 0, 10, 0],
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    alignment: 'right'
                                },
                                {
                                    text: 'PRICE',
                                    bold: true,
                                    margin: [0, 0, 10, 0],
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    alignment: 'right'
                                },
                                {
                                    text: 'TOTAL',
                                    bold: true,
                                    border: [false, false, false, true],
                                    fontSize: 10,
                                    alignment: 'right'
                                }
                            ]
                        ],
                        widths: ['*', 'auto', 'auto', 'auto']
                    }
                },
                {
                    margin: [0, 0, 0, 20],
                    columns: [
                        {
                            text: '',
                            width: '*'
                        },
                        {
                            width: '48%',
                            table: {
                                body: [
                                    [
                                        {
                                            text: 'SUBTOTAL',
                                            bold: true,
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        },
                                        {
                                            text: ['R', this.cart.summary.value.subtotal.toFixed(2)].join(''),
                                            border: [false, false, false, false],
                                            fontSize: 10,
                                            alignment: 'right'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'DISCOUNT',
                                            bold: true,
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        },
                                        {
                                            text: ['R', this.cart.summary.value.discount.toFixed(2)].join(''),
                                            border: [false, false, false, false],
                                            fontSize: 10,
                                            alignment: 'right'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'VAT (15%)',
                                            bold: true,
                                            border: [false, false, false, false],
                                            fontSize: 10
                                        },
                                        {
                                            text: ['R', this.cart.summary.value.vat.toFixed(2)].join(''),
                                            border: [false, false, false, false],
                                            fontSize: 10,
                                            alignment: 'right'
                                        }
                                    ],
                                    [
                                        {
                                            text: 'TOTAL',
                                            bold: true,
                                            border: [false, true, false, true],
                                            fontSize: 10
                                        },
                                        {
                                            text: ['R', this.cart.summary.value.total.toFixed(2)].join(''),
                                            bold: true,
                                            border: [false, true, false, true],
                                            fontSize: 10,
                                            alignment: 'right'
                                        }
                                    ]
                                ],
                                widths: ['*', 'auto']
                            }
                        }
                    ]
                }
            ];
            this.cart.items.map(product => {
                content[1].table.body.push([
                    {
                        text: product.title.toUpperCase(),
                        margin: [0, 0, 10, 0],
                        border: [false, false, false, false],
                        fontSize: 10
                    },
                    {
                        text: product.quantity.toFixed(2),
                        margin: [0, 0, 10, 0],
                        border: [false, false, false, false],
                        fontSize: 10,
                        alignment: 'right'
                    },
                    {
                        text: ['R', product.price.toFixed(2)].join(''),
                        margin: [0, 0, 10, 0],
                        border: [false, false, false, false],
                        fontSize: 10,
                        alignment: 'right'
                    },
                    {
                        text: ['R', (product.price * product.quantity).toFixed(2)].join(''),
                        border: [false, false, false, false],
                        fontSize: 10,
                        alignment: 'right'
                    }
                ]);
            });

            pdfMake.createPdf({
                content: content
            }).open();
        });
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');
        
        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            window.history.back();
        });
        
        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                this.store = this.config.value.value;
                this.list();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
        this.subscriptions.loaded.unsubscribe();
    }

}
