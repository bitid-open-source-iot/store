import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ShareComponent } from '../share/share.component';
import { DeleteDialog } from '../delete/delete.component';
import { SubscribersComponent } from '../subscribers/subscribers.component';
import { StoreEditorComponent } from 'src/app/pages/stores/editor/editor.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Store, STORE_DEFAULTS, StoresService } from 'src/app/services/stores/stores.service';

@Component({
    selector:       'app-store-button',
    styleUrls:      ['./store-button.component.scss'],
    templateUrl:    './store-button.component.html'
})

export class StoreButtonComponent implements OnInit, OnDestroy {

    constructor(private toast: ToastrService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router, private service: StoresService) {};

    public  store:          Store   = STORE_DEFAULTS;
    public  options:        any[]   = [
        {
            'title':    'Select Store',
            'optionId': 0,
            'disabled': false
        },
        {
            'title':    'Share',
            'optionId': 1,
            'disabled': true
        },
        {
            'title':    'Delete',
            'optionId': 2,
            'disabled': true
        },
        {
            'title':    'Manage',
            'optionId': 3,
            'disabled': true
        },
        {
            'title':    'Subscribers',
            'optionId': 4,
            'disabled': true
        }
    ];
    private subscriptions:  any     = {};

    public nav(optionId: number) {
        switch (optionId) {
            case(0):
                this.router.navigate(['/stores']);
                break;
            case(1):
                this.share();
                break;
            case(2):
                this.delete();
                break;
            case(3):
                this.manage();
                break;
            case(4):
                this.subscribers();
                break;
            default:
                break;
        };
    };

    private async share() {
        if (this.store.role < 4) {
            this.toast.warning('You may not add subscribers!', 'Insufficient Rights');
            return false;
        };

        const dialog = await this.dialog.open(ShareComponent, {
            'panelClass': 'share-dialog'
        });

        await dialog.afterClosed().subscribe(async (user) => {
            if (user) {
                const response = await this.service.share({
                    'role':     user.role,
                    'email':    user.email,
                    'storeId':  this.store.storeId
                });

                if (response.ok) {
                    this.toast.success(user.email + ' was shared successfully!');
                } else {
                    this.toast.error('User was not shared!');
                };
            };
        });
    };

    private async delete() {
        if (this.store.role < 5) {
            this.toast.warning('You may not add subscribers!', 'Insufficient Rights');
            return false;
        };

        const dialog = await this.dialog.open(DeleteDialog, {
            'panelClass': 'delete-dialog'
        });

        await dialog.afterClosed().subscribe(async (user) => {
            if (user) {
                const response = await this.service.delete({
                    'storeId':  this.store.storeId
                });

                if (response.ok) {
                    this.toast.success(this.store.description + ' was deleted successfully!');
                    this.router.navigate(['/stores']);
                } else {
                    this.toast.error('User was not deleted!');
                };
            };
        });
    };

    private async manage() {
        if (this.store.role < 2) {
            this.toast.warning('You may not manage store!', 'Insufficient Rights');
            return false;
        };

        const dialog = await this.dialog.open(StoreEditorComponent, {
            'data': {
                'address': {
                    'reg':          this.store.address.reg,
                    'vat':          this.store.address.vat,
                    'street':       this.store.address.street,
                    'suburb':       this.store.address.suburb,
                    'cityTown':     this.store.address.cityTown,
                    'postalCode':   this.store.address.postalCode
                },    
                'contact': {
                    'email':        this.store.contact.email,
                    'number':       this.store.contact.number,
                    'website':      this.store.contact.website
                },        
                'payfast': {
                    'merchantId':   this.store.payfast.merchantId,
                    'merchantKey':  this.store.payfast.merchantKey
                },
                'dns':              this.store.dns,
                'mode':             'edit',
                'logo':             this.store.logo,
                'description':      this.store.description,
                'organizationOnly': this.store.organizationOnly
            },
            'panelClass': 'app-store-manage-editor'
        });

        await dialog.afterClosed().subscribe(async (result) => {
            if (result) {
                const response = await this.service.update({
                    'address': {
                        'reg':          result.address.reg,
                        'vat':          result.address.vat,
                        'street':       result.address.street,
                        'suburb':       result.address.suburb,
                        'cityTown':     result.address.cityTown,
                        'postalCode':   result.address.postalCode
                    },    
                    'contact': {
                        'email':        result.contact.email,
                        'number':       result.contact.number,
                        'website':      result.contact.website
                    },        
                    'payfast': {
                        'merchantId':   result.payfast.merchantId,
                        'merchantKey':  result.payfast.merchantKey
                    },
                    'dns':              result.dns,
                    'logo':             result.logo,
                    'storeId':          this.store.storeId,
                    'description':      result.description,
                    'organizationOnly': result.organizationOnly
                });

                if (response.ok) {
                    this.toast.success('Store updated successfully!');
                } else {
                    this.toast.error('Store was not updated!');
                };
            };
        });
    };

    private async subscribers() {
        if (this.store.role < 4) {
            this.toast.warning('You may not manage store!', 'Insufficient Rights');
            return false;
        };

        this.dialog.open(SubscribersComponent, {
            'data': {
                'id':       this.store.storeId,
                'type':     'store',
                'storeId':  this.store.storeId,
                'service':  this.service
            },
            'panelClass': 'subscribers-dialog'
        });
    };

    ngOnInit() {
        this.subscriptions.store = this.service.store.subscribe((store: Store) => {
            this.store = store;

            if (typeof(this.store.storeId) != "undefined" && this.store.storeId != null && this.store.storeId != "") {
                this.options.map(option => {
                    if (option.optionId > 0) {
                        option.disabled = false;
                    };
                });
            };
        });
    };

    ngOnDestroy() {
        this.subscriptions.store.unsubscribe();
    };
}