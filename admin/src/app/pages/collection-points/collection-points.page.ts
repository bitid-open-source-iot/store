import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ShareDialog } from 'src/app/components/share/share.dialog';
import { DeleteDialog } from 'src/app/components/delete/delete.dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SearchComponent } from 'src/app/libs/search/search.component';
import { UnsubscribeDialog } from 'src/app/components/unsubscribe/unsubscribe.dialog';
import { SubscribersDialog } from 'src/app/components/subscribers/subscribers.dialog';
import { OptionsSheetComponent } from 'src/app/components/options-sheet/options-sheet.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-collection-points-page',
    styleUrls: ['./collection-points.page.scss'],
    templateUrl: './collection-points.page.html'
})

export class CollectionPointsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, { 'static': true }) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, public collectionpoints: CollectionPointsService, private route: ActivatedRoute, private router: Router) { };

    public filter: string = '';
    public storeId: string;
    public loading: boolean;
    private subscriptions: any = {};

    private async list() {
        this.loading = true;

        const response = await this.collectionpoints.list({
            'filter': [
                'role',
                'address',
                'storeId',
                'description',
                'collectionpointId'
            ]
        });

        if (response.ok) {
            this.collectionpoints.data = response.result;
        } else {
            this.collectionpoints.data = [];
        };

        this.loading = false;
    };

    public async options(collectionpoint) {
        const sheet = await this.sheet.open(OptionsSheetComponent, {
            'data': {
                'items': [
                    {
                        'role': collectionpoint.role,
                        'icon': 'edit',
                        'scope': 3,
                        'title': 'Edit',
                        'option': 1
                    },
                    {
                        'role': collectionpoint.role,
                        'icon': 'file_copy',
                        'scope': 3,
                        'title': 'Copy',
                        'option': 2
                    },
                    {
                        'role': collectionpoint.role,
                        'icon': 'share',
                        'scope': 4,
                        'title': 'Share',
                        'option': 3
                    },
                    {
                        'role': collectionpoint.role,
                        'icon': 'people',
                        'scope': 4,
                        'title': 'Subscribers',
                        'option': 4
                    },
                    {
                        'role': collectionpoint.role,
                        'icon': 'remove',
                        'scope': 1,
                        'color': 'warn',
                        'title': 'Unsubscribe',
                        'option': 5
                    },
                    {
                        'role': collectionpoint.role,
                        'icon': 'delete',
                        'scope': 5,
                        'color': 'warn',
                        'title': 'Delete',
                        'option': 6
                    }
                ],
                'title': collectionpoint.description
            }
        });

        await sheet.afterDismissed().subscribe(async result => {
            if (result) {
                switch (result) {
                    case (1):
                        this.router.navigate(['/collection-points', 'editor'], {
                            'queryParams': {
                                'mode': 'update',
                                'storeId': this.storeId,
                                'collectionpointId': collectionpoint.collectionpointId
                            }
                        });
                        break;
                    case (2):
                        this.router.navigate(['/collection-points', 'editor'], {
                            'queryParams': {
                                'mode': 'copy',
                                'storeId': this.storeId,
                                'collectionpointId': collectionpoint.collectionpointId
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

                                const response = await this.collectionpoints.share({
                                    'role': result.role,
                                    'email': result.email,
                                    'storeId': this.storeId,
                                    'collectionpointId': collectionpoint.collectionpointId
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
                                'id': collectionpoint.collectionpointId,
                                'type': 'collectionpoint',
                                'storeId': this.storeId,
                                'service': this.collectionpoints
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

                                const response = await this.collectionpoints.unsubscribe({
                                    'storeId': this.storeId,
                                    'collectionpointId': collectionpoint.collectionpointId
                                });

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from collection point!');
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

                                const response = await this.collectionpoints.delete({
                                    'storeId': this.storeId,
                                    'collectionpointId': collectionpoint.collectionpointId
                                });

                                if (response.ok) {
                                    this.toast.success('collection point was deleted!');
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

    ngOnInit(): void {
        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (typeof (params.storeId) != 'undefined' && params.storeId != null && params.storeId != '') {
                this.storeId = params.storeId;
                this.list();
            } else {
                this.router.navigate(['/stores']);
            };
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}