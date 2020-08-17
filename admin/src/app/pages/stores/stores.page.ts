import { MatDialog } from '@angular/material/dialog';
import { ShareDialog } from 'src/app/components/share/share.dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { DeleteDialog } from 'src/app/components/delete/delete.dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { SubscribersDialog } from 'src/app/components/subscribers/subscribers.dialog';
import { UnsubscribeDialog } from 'src/app/components/unsubscribe/unsubscribe.dialog';
import { OptionsSheetComponent } from 'src/app/components/options-sheet/options-sheet.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-stores-page',
    styleUrls: ['./stores.page.scss'],
    templateUrl: './stores.page.html'
})

export class StoresPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, { 'static': true }) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, public stores: StoresService, private route: ActivatedRoute, private router: Router) { };

    public filter: string = '';
    public storeId: string;
    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.stores.list({
            'filter': [
                'role',
                'logo',
                'storeId',
                'description'
            ]
        });

        if (response.ok) {
            this.stores.data = response.result;
        } else {
            this.stores.data = [];
        };

        this.loading = false;
    };

    public async options(store) {
        const sheet = await this.sheet.open(OptionsSheetComponent, {
            'data': {
                'items': [
                    {
                        'role': store.role,
                        'icon': 'edit',
                        'scope': 3,
                        'title': 'Edit',
                        'option': 1
                    },
                    {
                        'role': store.role,
                        'icon': 'file_copy',
                        'scope': 3,
                        'title': 'Copy',
                        'option': 2
                    },
                    {
                        'role': store.role,
                        'icon': 'share',
                        'scope': 4,
                        'title': 'Share',
                        'option': 3
                    },
                    {
                        'role': store.role,
                        'icon': 'people',
                        'scope': 4,
                        'title': 'Subscribers',
                        'option': 4
                    },
                    {
                        'role': store.role,
                        'icon': 'remove',
                        'scope': 1,
                        'color': 'warn',
                        'title': 'Unsubscribe',
                        'option': 5
                    },
                    {
                        'role': store.role,
                        'icon': 'delete',
                        'scope': 5,
                        'color': 'warn',
                        'title': 'Delete',
                        'option': 6
                    }
                ],
                'title': store.description
            }
        });

        await sheet.afterDismissed().subscribe(async result => {
            if (result) {
                switch (result) {
                    case (1):
                        this.router.navigate(['/stores', 'editor'], {
                            'queryParams': {
                                'mode': 'update',
                                'storeId': store.storeId
                            }
                        });
                        break;
                    case (2):
                        this.router.navigate(['/stores', 'editor'], {
                            'queryParams': {
                                'mode': 'copy',
                                'storeId': store.storeId
                            }
                        });
                        break;
                    case (3):
                        const share = await this.dialog.open(ShareDialog, {
                            'panelClass': 'share-dialog'
                        });

                        await share.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.stores.share({
                                    'role': result.role,
                                    'email': result.email,
                                    'storeId': store.storeId
                                });

                                if (response.ok) {
                                    this.toast.success('user was shared!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                    case (4):
                        this.dialog.open(SubscribersDialog, {
                            'data': {
                                'id': store.storeId,
                                'type': 'store',
                                'storeId': store.storeId,
                                'service': this.stores
                            },
                            'panelClass': 'subscribers-dialog'
                        });
                        break;
                    case (5):
                        const unsubscribe = await this.dialog.open(UnsubscribeDialog, {
                            'panelClass': 'unsubscribe-dialog'
                        });

                        await unsubscribe.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.stores.unsubscribe({
                                    'storeId': store.storeId
                                });

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from store!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                    case (6):
                        const remove = await this.dialog.open(DeleteDialog, {
                            'panelClass': 'delete-dialog'
                        });

                        await remove.afterClosed().subscribe(async result => {
                            if (result) {
                                this.loading = true;

                                const response = await this.stores.delete({
                                    'storeId': store.storeId
                                });

                                if (response.ok) {
                                    this.toast.success('store was deleted!');
                                } else {
                                    this.toast.error(response.error.message);
                                };

                                this.loading = false;
                            };
                        });
                        break;
                };
            };
        });
    };

    public async SelectStore(event: MouseEvent, storeId) {
        event.stopPropagation();
        this.router.navigate(['/stores'], {
            'queryParams': {
                'storeId': storeId
            }
        });
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            this.storeId = params.storeId;
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.filter = filter;
        });

        this.list();
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}