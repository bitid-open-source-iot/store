import { Order } from 'src/app/classes/order';
import { Courier } from 'src/app/classes/courier';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoreService } from 'src/app/services/store/store.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { ActivatedRoute } from '@angular/router';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { CollectionPoint } from 'src/app/classes/collection-point';
import { MatVerticalStepper } from '@angular/material/stepper';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'checkout-page',
    styleUrls: ['./checkout.page.scss'],
    templateUrl: './checkout.page.html'
})

export class CheckoutPage implements OnInit, OnDestroy {

    @ViewChild(MatVerticalStepper, { static: true }) private stepper: MatVerticalStepper;

    constructor(private route: ActivatedRoute, private toast: ToastService, private config: StoreService, private orders: OrdersService, public couriers: CouriersService, private buttons: ButtonsService, public collectionpoints: CollectionPointsService) { }

    public order: Order = new Order();
    public orderId: string;
    public loading: boolean;
    public payfast: any = environment.payfast;
    public options: any[] = [];
    public confirm: FormGroup = new FormGroup({
        method: new FormControl(null, [Validators.required])
    });
    public payment: FormGroup = new FormGroup({
        vat: new FormControl(0, [Validators.required]),
        total: new FormControl(0, [Validators.required]),
        credit: new FormControl(0, [Validators.required]),
        method: new FormControl('cc', [Validators.required]),
        discount: new FormControl(0, [Validators.required]),
        shipping: new FormControl(0, [Validators.required]),
        subtotal: new FormControl(0, [Validators.required])
    });
    public shipping: FormGroup = new FormGroup({
        address: new FormGroup({
            street: new FormControl(null),
            suburb: new FormControl(null),
            cityTown: new FormControl(null),
            postalCode: new FormControl(null),
            additionalInfo: new FormControl(null)
        }),
        method: new FormControl('collect'),
        enabled: new FormControl(null, [Validators.required]),
        optionId: new FormControl(null),
        courierId: new FormControl(null),
        collectionpointId: new FormControl(null)
    });
    public recipient: FormGroup = new FormGroup({
        name: new FormGroup({
            last: new FormControl(null, [Validators.required]),
            first: new FormControl(null, [Validators.required])
        }),
        company: new FormGroup({
            vat: new FormControl(null),
            reg: new FormControl(null),
            name: new FormControl(null)
        }),
        email: new FormControl(null, [Validators.required]),
        number: new FormControl(null, [Validators.required])
    });
    private subscriptions: any = {};

    private async load() {
        this.loading = true;

        const couriers = await this.couriers.list({
            filter: [
                'options',
                'courierId',
                'description'
            ]
        });

        if (couriers.ok) {
            this.couriers.data = couriers.result.map(o => new Courier(o));
        } else {
            this.couriers.data = [];
        };

        const collectionpoints = await this.collectionpoints.list({
            filter: [
                'address',
                'description',
                'collectionpointId'
            ]
        });

        if (collectionpoints.ok) {
            this.collectionpoints.data = collectionpoints.result.map(o => new CollectionPoint(o));
        } else {
            this.collectionpoints.data = [];
        };

        const orders = await this.orders.get({
            filter: [
                'email',
                'payment',
                'products',
                'shipping',
                'recipient'
            ],
            status: 'initialized',
            orderId: this.orderId
        });

        if (orders.ok) {
            this.order = new Order(orders.result);

            this.payment.controls.vat.setValue(this.order.payment.vat);
            this.payment.controls.total.setValue(this.order.payment.total);
            this.payment.controls.credit.setValue(this.order.payment.credit);
            this.payment.controls.method.setValue(this.order.payment.method);
            this.payment.controls.discount.setValue(this.order.payment.discount);
            this.payment.controls.shipping.setValue(this.order.payment.shipping);
            this.payment.controls.subtotal.setValue(this.order.payment.subtotal);

            (this.shipping.controls.address as FormGroup).controls.street.setValue(this.order.shipping.address.street);
            (this.shipping.controls.address as FormGroup).controls.suburb.setValue(this.order.shipping.address.suburb);
            (this.shipping.controls.address as FormGroup).controls.cityTown.setValue(this.order.shipping.address.cityTown);
            (this.shipping.controls.address as FormGroup).controls.postalCode.setValue(this.order.shipping.address.postalCode);
            (this.shipping.controls.address as FormGroup).controls.additionalInfo.setValue(this.order.shipping.address.additionalInfo);
            this.shipping.controls.method.setValue(this.order.shipping.method);
            this.shipping.controls.enabled.setValue(this.order.shipping.enabled);
            this.shipping.controls.optionId.setValue(this.order.shipping.optionId);
            this.shipping.controls.courierId.setValue(this.order.shipping.courierId);
            this.shipping.controls.collectionpointId.setValue(this.order.shipping.collectionpointId);

            (this.recipient.controls.name as FormGroup).controls.last.setValue(this.order.recipient.name.last);
            (this.recipient.controls.name as FormGroup).controls.first.setValue(this.order.recipient.name.first);
            (this.recipient.controls.company as FormGroup).controls.vat.setValue(this.order.recipient.company.vat);
            (this.recipient.controls.company as FormGroup).controls.reg.setValue(this.order.recipient.company.reg);
            (this.recipient.controls.company as FormGroup).controls.name.setValue(this.order.recipient.company.name);
            this.recipient.controls.email.setValue(this.order.recipient.email);
            this.recipient.controls.number.setValue(this.order.recipient.number);
        } else {
            this.toast.error(orders.error.message);
        };

        this.loading = false;
    }

    private async update() {
        this.loading = true;

        const orders = await this.orders.update({
            orderId: this.orderId,
            payment: this.payment.value,
            shipping: this.shipping.value,
            recipient: this.recipient.value
        });

        if (orders.ok) {

        } else {
            this.toast.error(orders.error.message);
        };

        this.loading = false;
    }

    public async verify() {
        this.loading = true;

        const form: HTMLFormElement = <any>document.getElementById('payfast');

        const response = await this.orders.verify({
            orderId: this.orderId
        });

        if (response.ok) {
            this.payment.controls['total'].setValue(response.result.payment.total);
            form.submit();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    private async calculate() {
        let summary: any = {};
        summary.vat = 0;
        summary.total = 0;
        summary.credit = 0;
        summary.discount = 0;
        summary.subtotal = 0;
        summary.shipping = this.payment.value.shipping || 0;
        this.order.products.map(product => {
            summary.subtotal += product.price * product.quantity;
            if (product.promotion.enabled) {
                summary.discount -= (product.price - product.promotion.price) * product.quantity;
            };
        });
        summary.total = summary.subtotal + summary.shipping + summary.discount;
        summary.vat = summary.total * 0.15;
        summary.subtotal -= summary.vat;
        this.payment.controls['vat'].setValue(summary.vat);
        this.payment.controls['total'].setValue(summary.total);
        this.payment.controls['shipping'].setValue(summary.shipping);
        this.payment.controls['discount'].setValue(summary.discount);
        this.payment.controls['subtotal'].setValue(summary.subtotal);
    };

    ngOnInit(): void {
        this.buttons.hide('cart');
        this.buttons.show('close');
        this.buttons.hide('search');
        this.buttons.hide('wishlist');

        if (environment.production) {
            this.payfast.return_url = window.location.origin + '/orders';
            this.payfast.cancel_url = window.location.href;
        } else {
            this.payfast.return_url = 'https://shop.bitid.co.za/orders';
            this.payfast.cancel_url = 'https://shop.bitid.co.za';
        };

        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            window.history.back();
        });

        this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
            if (loaded) {
                this.payfast.merchant_id = this.config.value.value.payfast.merchantId;
                this.payfast.merchant_key = this.config.value.value.payfast.merchantKey;
                const params = this.route.snapshot.queryParams;
                this.orderId = params.orderId;
                this.load();
            };
        });

        this.subscriptions.stepper = this.stepper.selectionChange.subscribe(event => {
            this.update();
        });

        this.subscriptions.shipping = this.shipping.valueChanges.subscribe(data => {
            this.calculate();
        });

        this.subscriptions.shippingmethod = this.shipping.controls.method.valueChanges.subscribe(method => {
            if (method == 'collect' || method == 'exworks') {
                this.shipping.controls.optionId.setValidators(null);
                this.shipping.controls.optionId.updateValueAndValidity();
                this.shipping.controls.courierId.setValidators(null);
                this.shipping.controls.courierId.updateValueAndValidity();
            } else if (method == 'deliver') {
                this.shipping.controls.optionId.setValidators([Validators.required]);
                this.shipping.controls.optionId.updateValueAndValidity();
                this.shipping.controls.courierId.setValidators([Validators.required]);
                this.shipping.controls.courierId.updateValueAndValidity();
            };
        });

        this.subscriptions.shippingenabled = this.shipping.controls.enabled.valueChanges.subscribe(enabled => {
            if (enabled) {
                (this.shipping.controls.address as FormGroup).controls.street.setValidators([Validators.required]);
                (this.shipping.controls.address as FormGroup).controls.street.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.suburb.setValidators([Validators.required]);
                (this.shipping.controls.address as FormGroup).controls.suburb.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.cityTown.setValidators([Validators.required]);
                (this.shipping.controls.address as FormGroup).controls.cityTown.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.postalCode.setValidators([Validators.required]);
                (this.shipping.controls.address as FormGroup).controls.postalCode.updateValueAndValidity();
                this.shipping.controls.method.setValidators([Validators.required]);
                this.shipping.controls.method.updateValueAndValidity();
                if (this.shipping.value.method == 'collect' || this.shipping.value.method == 'exworks') {
                    this.shipping.controls.optionId.setValidators(null);
                    this.shipping.controls.optionId.updateValueAndValidity();
                    this.shipping.controls.courierId.setValidators(null);
                    this.shipping.controls.courierId.updateValueAndValidity();
                } else if (this.shipping.value.method == 'deliver') {
                    this.shipping.controls.optionId.setValidators([Validators.required]);
                    this.shipping.controls.optionId.updateValueAndValidity();
                    this.shipping.controls.courierId.setValidators([Validators.required]);
                    this.shipping.controls.courierId.updateValueAndValidity();
                };
            } else {
                (this.shipping.controls.address as FormGroup).controls.street.setValidators(null);
                (this.shipping.controls.address as FormGroup).controls.street.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.suburb.setValidators(null);
                (this.shipping.controls.address as FormGroup).controls.suburb.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.cityTown.setValidators(null);
                (this.shipping.controls.address as FormGroup).controls.cityTown.updateValueAndValidity();
                (this.shipping.controls.address as FormGroup).controls.postalCode.setValidators(null);
                (this.shipping.controls.address as FormGroup).controls.postalCode.updateValueAndValidity();
                this.shipping.controls.method.setValidators(null);
                this.shipping.controls.method.updateValueAndValidity();
                this.shipping.controls.optionId.setValidators(null);
                this.shipping.controls.optionId.updateValueAndValidity();
                this.shipping.controls.courierId.setValidators(null);
                this.shipping.controls.courierId.updateValueAndValidity();
            };
        });

        this.subscriptions.shippingcourier = this.shipping.controls.courierId.valueChanges.subscribe(courierId => {
            for (let i = 0; i < this.couriers.data.length; i++) {
                if (this.couriers.data[i].courierId == courierId) {
                    this.options = this.couriers.data[i].options;
                    break;
                }
            }
        });

        this.subscriptions.shippingoptions = this.shipping.controls.optionId.valueChanges.subscribe(optionId => {
            for (let a = 0; a < this.couriers.data.length; a++) {
                if (this.couriers.data[a].courierId == this.shipping.value.courierId) {
                    this.options = this.couriers.data[a].options;
                    for (let b = 0; b < this.options.length; b++) {
                        if (this.options[b].optionId == optionId) {
                            this.payment.controls.shipping.setValue(this.options[b].price);
                            break;
                        }
                    }
                    break;
                }
            }
        });

        this.subscriptions.shippingcollectionpoint = this.shipping.controls.collectionpointId.valueChanges.subscribe(collectionpointId => {
            for (let i = 0; i < this.couriers.data.length; i++) {
                if (this.collectionpoints.data[i].collectionpointId == collectionpointId) {
                    (this.shipping.controls.address as FormGroup).controls.street.setValue(this.collectionpoints.data[i].address.street);
                    (this.shipping.controls.address as FormGroup).controls.suburb.setValue(this.collectionpoints.data[i].address.suburb);
                    (this.shipping.controls.address as FormGroup).controls.cityTown.setValue(this.collectionpoints.data[i].address.cityTown);
                    (this.shipping.controls.address as FormGroup).controls.postalCode.setValue(this.collectionpoints.data[i].address.postalCode);
                    break;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
        this.subscriptions.loaded.unsubscribe();
        this.subscriptions.stepper.unsubscribe();
        this.subscriptions.shipping.unsubscribe();
        this.subscriptions.shippingmethod.unsubscribe();
        this.subscriptions.shippingenabled.unsubscribe();
        this.subscriptions.shippingcourier.unsubscribe();
        this.subscriptions.shippingoptions.unsubscribe();
        this.subscriptions.shippingcollectionpoint.unsubscribe();
    }

}
