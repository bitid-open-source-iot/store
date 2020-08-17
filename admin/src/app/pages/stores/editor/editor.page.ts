import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-store-editor-page',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class StoreEditorPage implements OnInit, OnDestroy {

    @ViewChild(FileUploadComponent, { 'static': true }) private upload: FileUploadComponent;

    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: StoresService, public history: HistoryService, private formerror: FormErrorService) { };

    public mode: string;
    public form: FormGroup = new FormGroup({
        'contact': new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'number': new FormControl('', [Validators.required]),
            'website': new FormControl('', [Validators.required])
        }),
        'payfast': new FormGroup({
            'merchantId': new FormControl('', [Validators.required]),
            'merchantKey': new FormControl('', [Validators.required])
        }),
        'address': new FormGroup({
            'vat': new FormControl('', [Validators.required]),
            'reg': new FormControl('', [Validators.required]),
            'street': new FormControl('', [Validators.required]),
            'suburb': new FormControl('', [Validators.required]),
            'cityTown': new FormControl('', [Validators.required]),
            'postalCode': new FormControl('', [Validators.required])
        }),
        'logo': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl(1, [Validators.required])
    });
    public errors: any = {
        'contact': {
            'email': '',
            'number': '',
            'website': '',
        },
        'payfast': {
            'merchantId': '',
            'merchantKey': '',
        },
        'address': {
            'vat': '',
            'reg': '',
            'street': '',
            'suburb': '',
            'cityTown': '',
            'postalCode': '',
        },
        'logo': '',
        'description': ''
    };
    public records: string[] = [];
    public storeId: string;
    public loading: boolean;
    readonly keycodes: number[] = [ENTER, COMMA];
    public subscriptions: any = {};

    public add(event) {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.records.push(value.trim());
        };
        if (input) {
            input.value = '';
        };
    };

    public remove(url) {
        const index = this.records.indexOf(url);
        if (index >= 0) {
            this.records.splice(index, 1);
        };
    };

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'dns',
                'role',
                'logo',
                'contact',
                'payfast',
                'address',
                'description',
                'organizationOnly'
            ],
            'storeId': this.storeId
        });

        if (response.ok) {
            if (response.result.role < 3) {
                this.history.back();
            };

            this.records = response.result.dns;

            const contact: FormGroup = <any>this.form.controls['contact'];
            contact.controls['email'].setValue(response.result.contact.email);
            contact.controls['number'].setValue(response.result.contact.number);
            contact.controls['website'].setValue(response.result.contact.website);

            const payfast: FormGroup = <any>this.form.controls['payfast'];
            payfast.controls['merchantId'].setValue(response.result.payfast.merchantId);
            payfast.controls['merchantKey'].setValue(response.result.payfast.merchantKey);

            const address: FormGroup = <any>this.form.controls['address'];
            address.controls['vat'].setValue(response.result.address.vat);
            address.controls['reg'].setValue(response.result.address.reg);
            address.controls['street'].setValue(response.result.address.street);
            address.controls['suburb'].setValue(response.result.address.suburb);
            address.controls['cityTown'].setValue(response.result.address.cityTown);
            address.controls['postalCode'].setValue(response.result.address.postalCode);

            this.form.controls['logo'].setValue(response.result.logo);
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
            delete this.storeId;
        };

        const response = await this.service[mode]({
            'dns': this.records,
            'logo': this.form.value.logo,
            'contact': this.form.value.contact,
            'payfast': this.form.value.payfast,
            'address': this.form.value.address,
            'storeId': this.storeId,
            'description': this.form.value.description,
            'organizationOnly': this.form.value.organizationOnly
        });

        if (response.ok) {
            this.toast.success('store was updated!');
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

            if (this.mode != 'add') {
                this.get();
            };
        });

        this.subscriptions.upload = this.upload.result.subscribe(logo => {
            this.form.controls['logo'].setValue(logo);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
        this.subscriptions.upload.unsubscribe();
    };

}