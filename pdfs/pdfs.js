const Maker = require('pdfmake');
const moment = require('moment');

exports.invoice = (args) => {
    const printer = new Maker({
        Roboto: {
            bold: __dirname + '/fonts/Roboto-Medium.ttf',
            normal: __dirname + '/fonts/Roboto-Regular.ttf',
            italics: __dirname + '/fonts/Roboto-Italic.ttf',
            bolditalics: __dirname + '/fonts/Roboto-MediumItalic.ttf'
        }
    });
    
    var content = [
        {
            margin: [0, 0, 0, 20],
            columns: [
                {
                    width: '*',
                    table: {
                        body: [
                            [
                                {
                                    text: args.order.store.description,
                                    bold: true,
                                    border: [false, false, false, false],
                                    fontSize: 18
                                }
                            ],
                            [
                                {
                                    text: args.order.store.address.street.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: args.order.store.address.suburb.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: args.order.store.address.cityTown.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: args.order.store.address.postalCode.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: 'VAT: ' + args.order.store.address.vat.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: 'REG: ' + args.order.store.address.reg.toUpperCase(),
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
                                    text: moment(args.order.date.paid).format('YYYY/MM/DD'),
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
                                    text: args.order.orderId.toUpperCase(),
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
                                    text: [args.order.recipient.name.first.toLocaleUpperCase(), ' ', args.order.recipient.name.last.toLocaleUpperCase(), ' (', args.order.recipient.company.name, ')'].join(''),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: args.order.recipient.number,
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: args.order.recipient.email,
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: 'VAT: ' + args.order.recipient.company.vat.toUpperCase(),
                                    border: [false, false, false, false],
                                    fontSize: 10
                                }
                            ],
                            [
                                {
                                    text: 'REG: ' + args.order.recipient.company.reg.toUpperCase(),
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
                                    text: ['R', args.order.payment.subtotal.toFixed(2)].join(''),
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
                                    text: ['R', args.order.payment.shipping.toFixed(2)].join(''),
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
                                    text: ['R', args.order.payment.discount.toFixed(2)].join(''),
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
                                    text: ['R', args.order.payment.vat.toFixed(2)].join(''),
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
                                    text: ['R', args.order.payment.total.toFixed(2)].join(''),
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

    args.order.products.map(product => {
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

    if (args.order.shipping.enabled) {
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
                            text: [args.order.recipient.name.first, ' ', args.order.recipient.name.last].join('').toLocaleUpperCase(),
                            bold: true,
                            border: [false, false, false, false],
                            fontSize: 10
                        }
                    ],
                    [
                        {
                            text: args.order.shipping.address.street.toUpperCase(),
                            border: [false, false, false, false],
                            fontSize: 10
                        }
                    ],
                    [
                        {
                            text: args.order.shipping.address.suburb.toUpperCase(),
                            border: [false, false, false, false],
                            fontSize: 10
                        }
                    ],
                    [
                        {
                            text: args.order.shipping.address.cityTown.toUpperCase(),
                            border: [false, false, false, false],
                            fontSize: 10
                        }
                    ],
                    [
                        {
                            text: args.order.shipping.address.postalCode.toUpperCase(),
                            border: [false, false, false, false],
                            fontSize: 10
                        }
                    ]
                ],
                widths: ['*']
            }
        })
    }

    const document = printer.createPdfKitDocument({
        content: content
    });
    args.res.setHeader('Content-Type', 'application/pdf');
    document.pipe(args.res);
    document.end();
}