import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Order } from 'src/app/classes/order';
import { Store } from 'src/app/classes/store';
import { StoreService } from 'src/app/services/store/store.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { DownloadService } from 'src/app/services/download/download.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'orders-viewer-page',
    styleUrls: ['./viewer.page.scss'],
    templateUrl: './viewer.page.html'
})

export class OrdersViewerPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, private route: ActivatedRoute, private config: StoreService, private router: Router, private service: OrdersService, private buttons: ButtonsService, private download: DownloadService) { }

    public link: string;
    public store: Store = new Store();
    public order: Order = new Order();
    public orderId: string;
    public loading: boolean;
    private subscriptions: any = {};

    public async pdf() {
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
                                        text: '',
                                        border: [false, false, false, false]
                                    },
                                    {
                                        text: 'INVOICE',
                                        bold: true,
                                        border: [false, false, false, false],
                                        fontSize: 18,
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    {
                                        text: 'DATE',
                                        bold: true,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: moment(this.order.date.paid).format('YYYY/MM/DD'),
                                        border: [false, false, false, false],
                                        fontSize: 10,
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    {
                                        text: 'ORDER ID',
                                        bold: true,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: this.order.orderId.toUpperCase(),
                                        border: [false, false, false, false],
                                        alignment: 'right',
                                        fontSize: 10
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                margin: [0, 0, 0, 20],
                columns: [
                    {
                        width: '48%',
                        table: {
                            body: [
                                [
                                    {
                                        text: 'BILL TO',
                                        bold: true,
                                        border: [false, false, false, true],
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        bold: true,
                                        text: [this.order.recipient.name.first.toLocaleUpperCase(), ' ', this.order.recipient.name.last.toLocaleUpperCase(), ' (', this.order.recipient.company.name, ')'].join(''),
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        text: this.order.recipient.number,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    }
                                ],
                                [
                                    {
                                        text: this.order.recipient.email,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    }
                                ]
                            ],
                            widths: ['*']
                        }
                    },
                    {
                        text: '',
                        width: '4%'
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
                                        text: ['R', this.order.payment.subtotal.toFixed(2)].join(''),
                                        border: [false, false, false, false],
                                        fontSize: 10,
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    {
                                        text: 'SHIPPING',
                                        bold: true,
                                        border: [false, false, false, false],
                                        fontSize: 10
                                    },
                                    {
                                        text: ['R', this.order.payment.shipping.toFixed(2)].join(''),
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
                                        text: ['R', this.order.payment.discount.toFixed(2)].join(''),
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
                                        text: ['R', this.order.payment.vat.toFixed(2)].join(''),
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
                                        text: ['R', this.order.payment.total.toFixed(2)].join(''),
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

        if (typeof(this.order.recipient.company) != 'undefined' && this.order.recipient.company != null) {
            if (typeof(this.order.recipient.company.vat) != 'undefined' && this.order.recipient.company.vat != null) {
                content[1].columns[0].table.body.push([
                    {
                        text: 'VAT: ' + this.order.recipient.company.vat.toUpperCase(),
                        border: [false, false, false, false],
                        fontSize: 10
                    }
                ]);
            }
            if (typeof(this.order.recipient.company.reg) != 'undefined' && this.order.recipient.company.reg != null) {
                content[1].columns[0].table.body.push([
                    {
                        text: 'REG: ' + this.order.recipient.company.reg.toUpperCase(),
                        border: [false, false, false, false],
                        fontSize: 10
                    }
                ]);
            }
        }

        this.order.products.map(product => {
            content[2].table.body.push([
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

        if (this.order.shipping.enabled) {
            content[1].columns.push({
                width: '48%',
                table: {
                    body: [
                        [
                            {
                                text: 'SHIP TO',
                                bold: true,
                                border: [false, false, false, true],
                                fontSize: 10
                            }
                        ],
                        [
                            {
                                text: [this.order.recipient.name.first, ' ', this.order.recipient.name.last].join('').toLocaleUpperCase(),
                                bold: true,
                                border: [false, false, false, false],
                                fontSize: 10
                            }
                        ],
                        [
                            {
                                text: this.order.shipping.address.street.toUpperCase(),
                                border: [false, false, false, false],
                                fontSize: 10
                            }
                        ],
                        [
                            {
                                text: this.order.shipping.address.suburb.toUpperCase(),
                                border: [false, false, false, false],
                                fontSize: 10
                            }
                        ],
                        [
                            {
                                text: this.order.shipping.address.cityTown.toUpperCase(),
                                border: [false, false, false, false],
                                fontSize: 10
                            }
                        ],
                        [
                            {
                                text: this.order.shipping.address.postalCode.toUpperCase(),
                                border: [false, false, false, false],
                                fontSize: 10
                            }
                        ]
                    ],
                    widths: ['*']
                }
            })
        }

        pdfMake.createPdf({
            content: content
        }).open();
    }

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            orderId: this.orderId
        });

        if (response.ok) {
            this.order = new Order(response.result);
            this.link = [window.location.origin, '/store/download/invoice?email=', this.order.email, '&orderId=', this.order.orderId].join('');
        } else {
            this.toast.error(response.error.message);
            this.router.navigate(['/orders']);
        }

        this.loading = false;
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');

        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            this.router.navigate(['/orders']);
        });

        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                this.store = this.config.value.value;
                const params = this.route.snapshot.queryParams;
                this.orderId = params.orderId;
                this.get();
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
        this.subscriptions.loaded.unsubscribe();
    }

}
