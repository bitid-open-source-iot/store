import { ToastService } from 'src/app/services/toast/toast.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { ActivatedRoute } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { CollectionPointsService } from 'src/app/services/collection-points/collection-points.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-collection-point-editor-page',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class CollectionPointEditorPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, private service: CollectionPointsService, public history: HistoryService, private formerror: FormErrorService) { };

    public mode: string;
    public form: FormGroup = new FormGroup({
        'address': new FormGroup({
            'street': new FormControl('', [Validators.required]),
            'suburb': new FormControl('', [Validators.required]),
            'cityTown': new FormControl('', [Validators.required]),
            'postalCode': new FormControl('', [Validators.required])
        }),
        'description': new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl(1, [Validators.required])
    });
    public errors: any = {
        'address': {
            'street': '',
            'suburb': '',
            'cityTown': '',
            'postalCode': '',
        },
        'description': '',
        'organizationOnly': ''
    };
    public storeId: string;
    public loading: boolean;
    public subscriptions: any = {};
    public collectionpointId: string;

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'address',
                'description',
                'organizationOnly'
            ],
            'storeId': this.storeId,
            'collectionpointId': this.collectionpointId
        });

        if (response.ok) {
            if (response.result.role < 3) {
                this.history.back();
            };

            const address: FormGroup = <any>this.form.controls['address'];
            address.controls['street'].setValue(response.result.address.street);
            address.controls['suburb'].setValue(response.result.address.suburb);
            address.controls['cityTown'].setValue(response.result.address.cityTown);
            address.controls['postalCode'].setValue(response.result.address.postalCode);

            this.form.controls['description'].setValue(response.result.description);
            this.form.controls['organizationOnly'].setValue(response.result.organizationOnly);
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    public async submit() {
        this.loading = true;

        let mode = this.mode;
        if (mode == 'copy') {
            mode = 'add';
            delete this.collectionpointId;
        };

        const response = await this.service[mode]({
            'address': this.form.value.address,
            'storeId': this.storeId,
            'description': this.form.value.description,
            'organizationOnly': this.form.value.organizationOnly,
            'collectionpointId': this.collectionpointId
        });

        if (response.ok) {
            this.toast.success('collection point was updated!');
            this.history.back();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            this.mode = params.mode;
            this.storeId = params.storeId;
            this.collectionpointId = params.collectionpointId;

            if (this.mode != 'add') {
                this.get();
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}