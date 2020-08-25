import { Title } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { AccountService } from 'src/app/services/account/account.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-checkout-page',
    styleUrls:      ['./checkout.page.scss'],
    templateUrl:    './checkout.page.html'
})

export class CheckoutPage implements OnInit, OnDestroy {

    @ViewChild(MatStepper, {'static': true}) private stepper: MatStepper;

    constructor(public cart: CartService, private store: StoresService, private route: ActivatedRoute, private toast: ToastService, public couriers: CouriersService, private router: Router, private title: Title, private account: AccountService, private service: OrdersService, private history: HistoryService, private formerror: FormErrorService, public collection: CollectionPointsService) {};

    public order:           any;
	public payfast:         any     	= {
        'url':          environment.payfast.url,
        'return_url':   (environment.production ? (window.location.origin + '/orders') : 'https://shop.bitid.co.za/orders'),
		'cancel_url':   (environment.production ? (window.location.origin + '/products') : 'https://shop.bitid.co.za/products'),
		'notify_url':   'https://payfast.bitid.co.za/api/notify/itn',
        'merchant_id':  '',
        'm_payment_id': '',
        'merchant_key': ''
    };
    public orderId:         string;
    public loading:         boolean;
    public options:         any[]       = [];
    public payment:         FormGroup   = new FormGroup({
        'vat':      new FormControl(null, [Validators.required]),
        'total':    new FormControl(null, [Validators.required]),
        'credit':   new FormControl(0, [Validators.required]),
        'method':   new FormControl(null, [Validators.required]),
        'discount': new FormControl(null, [Validators.required]),
        'shipping': new FormControl(null, [Validators.required]),
        'subtotal': new FormControl(null, [Validators.required])
    });
    public shipping:        FormGroup   = new FormGroup({
        'address':      new FormGroup({
            'type':             new FormControl('residential', [Validators.required]),
            'street':           new FormControl(null),
            'suburb':           new FormControl(null),
            'cityTown':         new FormControl(null),
            'postalCode':       new FormControl(null),
            'additionalInfo':   new FormControl(null)
        }),
        'method':               new FormControl(null, [Validators.required]),
        'optionId':             new FormControl(null),
        'courierId':            new FormControl(null),
        'collectionpointId':    new FormControl(null)
    });
    public recipient:       FormGroup = new FormGroup({
        'name': new FormGroup({
            'last':     new FormControl(null, [Validators.required]),
            'first':    new FormControl(null, [Validators.required])
        }),
        'company': new FormGroup({
            'vat':  new FormControl(null),
            'reg':  new FormControl(null),
            'name': new FormControl(null)
        }),
        'email':    new FormControl(null, [Validators.required, Validators.email]),
        'number':   new FormControl(null, [Validators.required])
    });
    public PaymentErrors:   any         = {
        'vat':      '',
        'total':    '',
        'credit':   '',
        'method':   '',
        'shipping': '',
        'subtotal': ''
    };
    public ShippingErrors:  any         = {
        'address': {
            'type':             '',
            'street':           '',
            'suburb':           '',
            'cityTown':         '',
            'postalCode':       '',
            'additionalInfo':   ''
        },
        'method':               '',
        'optionId':             '',
        'courierId':            '',
        'collectionpointId':    ''
    };
    private subscriptions:  any         = {};
    public RecipientErrors: any         = {
        'name': {
            'last':     '',
            'first':    ''
        },
        'company': {
            'vat':  '',
            'reg':  '',
            'name': ''
        },
        'email':    '',
        'number':   ''
    };

    public async back() {
        this.router.navigate(['/'])
    };

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'orderId': this.orderId
        });

        if (response.ok) {
            this.order                  = response.result;
            this.payfast.return_url     = environment.production ? [window.location.origin, '/orders/', this.order.orderId].join('') : ['https://shop.bitid.co.za/orders/', this.order.orderId].join(''),
            this.payfast.m_payment_id   = this.order.orderId;
            /* --- SET PAYMENT --- */
            if (typeof(this.order.payment) != 'undefined' && this.order.payment != null && this.order.payment != '') {
                if (typeof(this.order.payment.total) != 'undefined' && this.order.payment.total != null && this.order.payment.total != '') {
                    this.payment.controls['total'].setValue(this.order.payment.total);
                };
                if (typeof(this.order.payment.credit) != 'undefined' && this.order.payment.credit != null && this.order.payment.credit != '') {
                    this.payment.controls['credit'].setValue(this.order.payment.credit);
                };
                if (typeof(this.order.payment.method) != 'undefined' && this.order.payment.method != null && this.order.payment.method != '') {
                    this.payment.controls['method'].setValue(this.order.payment.method);
                };
                if (typeof(this.order.payment.discount) != 'undefined' && this.order.payment.discount != null && this.order.payment.discount != '') {
                    this.payment.controls['discount'].setValue(this.order.payment.discount);
                };
                if (typeof(this.order.payment.shipping) != 'undefined' && this.order.payment.shipping != null && this.order.payment.shipping != '') {
                    this.payment.controls['shipping'].setValue(this.order.payment.shipping);
                };
                if (typeof(this.order.payment.subtotal) != 'undefined' && this.order.payment.subtotal != null && this.order.payment.subtotal != '') {
                    this.payment.controls['subtotal'].setValue(this.order.payment.subtotal);
                };
            };
            /* --- SET SHIPPING --- */
            const address: FormGroup = <any>this.shipping.controls.address;
            if (typeof(this.order.shipping.address) != 'undefined' && this.order.shipping.address != null && this.order.shipping.address != '') {
                if (typeof(this.order.shipping.address.type) != 'undefined' && this.order.shipping.address.type != null && this.order.shipping.address.type != '') {
                    address.controls['type'].setValue(this.order.shipping.address.type);
                };
                if (typeof(this.order.shipping.address.street) != 'undefined' && this.order.shipping.address.street != null && this.order.shipping.address.street != '') {
                    address.controls['street'].setValue(this.order.shipping.address.street);
                };
                if (typeof(this.order.shipping.address.suburb) != 'undefined' && this.order.shipping.address.suburb != null && this.order.shipping.address.suburb != '') {
                    address.controls['suburb'].setValue(this.order.shipping.address.suburb);
                };
                if (typeof(this.order.shipping.address.cityTown) != 'undefined' && this.order.shipping.address.cityTown != null && this.order.shipping.address.cityTown != '') {
                    address.controls['cityTown'].setValue(this.order.shipping.address.cityTown);
                };
                if (typeof(this.order.shipping.address.postalCode) != 'undefined' && this.order.shipping.address.postalCode != null && this.order.shipping.address.postalCode != '') {
                    address.controls['postalCode'].setValue(this.order.shipping.address.postalCode);
                };
                if (typeof(this.order.shipping.address.additionalInfo) != 'undefined' && this.order.shipping.address.additionalInfo != null && this.order.shipping.address.additionalInfo != '') {
                    address.controls['additionalInfo'].setValue(this.order.shipping.address.additionalInfo);
                };
            };
            if (typeof(this.order.shipping.method) != 'undefined' && this.order.shipping.method != null && this.order.shipping.method != '') {
                this.shipping.controls['method'].setValue(this.order.shipping.method);
            };
            if (typeof(this.order.shipping.optionId) != 'undefined' && this.order.shipping.optionId != null && this.order.shipping.optionId != '') {
                this.shipping.controls['optionId'].setValue(this.order.shipping.optionId);
            };
            if (typeof(this.order.shipping.courierId) != 'undefined' && this.order.shipping.courierId != null && this.order.shipping.courierId != '') {
                this.shipping.controls['courierId'].setValue(this.order.shipping.courierId);
            };
            if (typeof(this.order.shipping.collectionpointId) != 'undefined' && this.order.shipping.collectionpointId != null && this.order.shipping.collectionpointId != '') {
                this.shipping.controls['collectionpointId'].setValue(this.order.shipping.collectionpointId);
            };
            /* --- SET RECIPIENT --- */
            const name: FormGroup = <any>this.recipient.controls.name;
            if (typeof(this.order.recipient.name) != 'undefined' && this.order.recipient.name != null && this.order.recipient.name != '') {
                if (typeof(this.order.recipient.name.last) != 'undefined' && this.order.recipient.name.last != null && this.order.recipient.name.last != '') {
                    name.controls['last'].setValue(this.order.recipient.name.last);
                };
                if (typeof(this.order.recipient.name.first) != 'undefined' && this.order.recipient.name.first != null && this.order.recipient.name.first != '') {
                    name.controls['first'].setValue(this.order.recipient.name.first);
                };
            };
            const company: FormGroup = <any>this.recipient.controls.company;
            if (typeof(this.order.recipient.company) != 'undefined' && this.order.recipient.company != null && this.order.recipient.company != '') {
                if (typeof(this.order.recipient.company.vat) != 'undefined' && this.order.recipient.company.vat != null && this.order.recipient.company.vat != '') {
                    company.controls['vat'].setValue(this.order.recipient.company.vat);
                };
                if (typeof(this.order.recipient.company.reg) != 'undefined' && this.order.recipient.company.reg != null && this.order.recipient.company.reg != '') {
                    company.controls['reg'].setValue(this.order.recipient.company.reg);
                };
                if (typeof(this.order.recipient.company.name) != 'undefined' && this.order.recipient.company.name != null && this.order.recipient.company.name != '') {
                    company.controls['name'].setValue(this.order.recipient.company.name);
                };
            };
            if (typeof(this.order.recipient.email) != 'undefined' && this.order.recipient.email != null && this.order.recipient.email != '') {
                this.recipient.controls['email'].setValue(this.order.recipient.email);
            };
            if (typeof(this.order.recipient.number) != 'undefined' && this.order.recipient.number != null && this.order.recipient.number != '') {
                this.recipient.controls['number'].setValue(this.order.recipient.number);
            };
        } else {
            // this.toast.error();
        };

        this.loading = false;
    };

    private async load() {
        this.loading = true;

        const couriers = await this.couriers.list({});

        if (couriers.ok) {
            this.couriers.data = couriers.result;
        };
        
        const collection = await this.collection.list({});

        if (collection.ok) {
            this.collection.data = collection.result;
        };

        this.loading = false;
    };

    private async calculate() {
        let summary: any    = {};
        summary.vat         = 0;
        summary.total       = 0;
        summary.credit      = 0;
        summary.discount    = 0;
        summary.subtotal    = 0;
        summary.shipping    = this.payment.value.shipping || 0;
        this.order.products.map(product => {
            summary.subtotal += product.price * product.quantity;
            if (product.promotion.enabled) {
                summary.discount -= (product.price - product.promotion.price) * product.quantity;
            };
        });
        summary.total  = summary.subtotal + summary.shipping + summary.discount;
        summary.vat    = summary.total * 0.15;
        summary.total  = summary.total * 1.15;
        this.payment.controls['vat'].setValue(summary.vat);
        this.payment.controls['total'].setValue(summary.total);
        this.payment.controls['shipping'].setValue(summary.shipping);
        this.payment.controls['discount'].setValue(summary.discount);
        this.payment.controls['subtotal'].setValue(summary.subtotal);
    };

    private async initialize() {
        this.loading = true;

        const response = await this.service.initialize({
            'products': this.cart.items
        });

        if (response.ok) {
            this.router.navigate(['/checkout'], {
                'queryParams': {
                    'orderId': response.result.orderId
                },
                'replaceUrl': true
            });
        } else {
            // this.toast.error();
        };

        this.loading = false;
    };

    private async ToggleShipping() {
        const address: FormGroup = <any>this.shipping.controls.address;
        
        address.controls['street'].setValidators(null);
        address.controls['street'].updateValueAndValidity();
        address.controls['suburb'].setValidators(null);
        address.controls['suburb'].updateValueAndValidity();
        address.controls['cityTown'].setValidators(null);
        address.controls['cityTown'].updateValueAndValidity();
        address.controls['postalCode'].setValidators(null);
        address.controls['postalCode'].updateValueAndValidity();

        this.shipping.controls['optionId'].setValidators(null);
        this.shipping.controls['optionId'].updateValueAndValidity();
        this.shipping.controls['courierId'].setValidators(null);
        this.shipping.controls['courierId'].updateValueAndValidity();
        this.shipping.controls['collectionpointId'].setValidators(null);
        this.shipping.controls['collectionpointId'].updateValueAndValidity();

        if (this.shipping.value.method == 'deliver') {
            address.controls['street'].setValidators([Validators.required]);
            address.controls['street'].updateValueAndValidity();
            address.controls['suburb'].setValidators([Validators.required]);
            address.controls['suburb'].updateValueAndValidity();
            address.controls['cityTown'].setValidators([Validators.required]);
            address.controls['cityTown'].updateValueAndValidity();
            address.controls['postalCode'].setValidators([Validators.required]);
            address.controls['postalCode'].updateValueAndValidity();

            this.shipping.controls['optionId'].setValidators([Validators.required]);
            this.shipping.controls['optionId'].updateValueAndValidity();
            this.shipping.controls['courierId'].setValidators([Validators.required]);
            this.shipping.controls['courierId'].updateValueAndValidity();
        } else if (this.shipping.value.method == 'exworks') {
            address.controls['street'].setValidators([Validators.required]);
            address.controls['street'].updateValueAndValidity();
            address.controls['suburb'].setValidators([Validators.required]);
            address.controls['suburb'].updateValueAndValidity();
            address.controls['cityTown'].setValidators([Validators.required]);
            address.controls['cityTown'].updateValueAndValidity();
            address.controls['postalCode'].setValidators([Validators.required]);
            address.controls['postalCode'].updateValueAndValidity();
        } else if (this.shipping.value.method == 'collect') {
            this.shipping.controls['collectionpointId'].setValidators([Validators.required]);
            this.shipping.controls['collectionpointId'].updateValueAndValidity();
        };
    };

    public async verify() {
        this.loading = true;

        const form: HTMLFormElement = <any>document.getElementById('payfast');

        const response = await this.service.verify({
            'orderId': this.orderId
        });

        if (response.ok) {
            this.payment.controls['total'].setValue(response.result.payment.total);
            form.submit();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    ngOnInit(): void {
        this.load();

        this.subscriptions.store = this.store.store.subscribe(store => {
            if (store) {
                this.payfast.merchant_id 	= (environment.production ? parseFloat(store.payfast.merchantId) : environment.payfast.merchant_id);
                this.payfast.merchant_key 	= (environment.production ? store.payfast.merchantKey : environment.payfast.merchant_key);
                this.title.setTitle([store.description, '-', 'CHECKOUT'].join(' '));
            };
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (this.account.authenticated.value) {
                if (typeof(params.orderId) != 'undefined' && params.orderId != null && params.orderId != '') {
                    this.orderId = params.orderId;
                    this.get();
                } else {
                    this.initialize();
                };
            } else {
                this.router.navigate(['/signin'], {
                    'queryParams': {
                        'returnUrl': [window.location.pathname, window.location.search].join('')
                    }
                });
            };
        });

        this.subscriptions.option = this.shipping.controls['optionId'].valueChanges.subscribe(optionId => {
            this.options.map(async option => {
                if (option.optionId == optionId) {
                    this.loading = true;

                    this.payment.controls['shipping'].setValue(option.price);
                    
                    await this.service.update({
                        'orderId': this.orderId,
                        'payment': this.payment.value
                    });
                    
                    this.loading = false;
                };
            });
        });

        this.subscriptions.courier = this.shipping.controls['courierId'].valueChanges.subscribe(courierId => {
            this.couriers.data.map(courier => {
                if (courier.courierId == courierId) {
                    this.options = courier.options;
                };
            });
        });

        this.subscriptions.stepper = this.stepper.selectionChange.subscribe(async event => {
            this.loading = true;

            this.calculate();

            await this.service.update({
                'orderId':      this.orderId,
                'payment':      this.payment.value,
                'shipping':     this.shipping.value,
                'recipient':    this.recipient.value
            });
           
            this.loading = false;
        });

        this.subscriptions.payment = this.payment.valueChanges.subscribe(data => {
            this.PaymentErrors = this.formerror.validateForm(this.payment, this.PaymentErrors, true);
        });

        this.subscriptions.shipping = this.shipping.controls['method'].valueChanges.subscribe(method => {
            this.ToggleShipping();
        });

        this.subscriptions.recipient = this.recipient.valueChanges.subscribe(data => {
            this.RecipientErrors = this.formerror.validateForm(this.recipient, this.RecipientErrors, true);
        });

        this.subscriptions.shippingmethod = this.shipping.controls['method'].valueChanges.subscribe(method => {
            if (method == 'collect') {
                this.payment.controls['shipping'].setValue(0);
                this.calculate();
            };
        });

        this.subscriptions.shippingErrors = this.shipping.valueChanges.subscribe(data => {
            this.ShippingErrors = this.formerror.validateForm(this.shipping, this.ShippingErrors, true);
        });

        this.subscriptions.collectionpoint = this.shipping.controls['collectionpointId'].valueChanges.subscribe(collectionpointId => {
            this.collection.data.map(point => {
                if (point.collectionpointId == collectionpointId) {
                    const address: FormGroup = <any>this.shipping.controls.address;
                    address.controls['street'].setValue(point.address.street);
                    address.controls['suburb'].setValue(point.address.suburb);
                    address.controls['cityTown'].setValue(point.address.cityTown);
                    address.controls['postalCode'].setValue(point.address.postalCode);
                    address.controls['additionalInfo'].setValue(point.address.additionalInfo);
                };
            });
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.option.unsubscribe();
        this.subscriptions.courier.unsubscribe();
        this.subscriptions.stepper.unsubscribe();
        this.subscriptions.payment.unsubscribe();
        this.subscriptions.shipping.unsubscribe();
        this.subscriptions.recipient.unsubscribe();
        this.subscriptions.shippingmethod.unsubscribe();
        this.subscriptions.shippingErrors.unsubscribe();
        this.subscriptions.collectionpoint.unsubscribe();
    };

}