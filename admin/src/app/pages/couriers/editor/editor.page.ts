import { ObjectId } from 'src/app/id';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from 'src/app/services/history/history.service';
import { CouriersService } from 'src/app/services/couriers/couriers.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';


@Component({
    selector:       'app-courier-editor-page',
    styleUrls:      ['./editor.page.scss'],
    templateUrl:    './editor.page.html'
})

export class CourierEditorPage implements OnInit, OnDestroy {

    @ViewChild(FileUploadComponent, { 'static': true }) private upload: FileUploadComponent;

    constructor(private route: ActivatedRoute, private toast: ToastService, public history: HistoryService, private service: CouriersService, private formerror: FormErrorService) { };

    public mode: string;
    public form: FormGroup = new FormGroup({
        'icon': new FormControl(null, [Validators.required]),
        'phone': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'account': new FormControl(null, [Validators.required]),
        'description': new FormControl(null, [Validators.required]),
        'organizationOnly': new FormControl(1, [Validators.required])
    });
    public errors: any = {
        'icon': '',
        'phone': '',
        'email': '',
        'account': '',
        'description': '',
        'organizationOnly': ''
    };
    public options: any[] = [];
    public storeId: string;
    public loading: boolean;
    public courierId: string;
    public optionItem: any = {};
    public subscriptions: any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'icon',
                'role',
                'phone',
                'email',
                'storeId',
                'options',
                'account',
                'courierId',
                'description',
                'organizationOnly'
            ],
            'storeId': this.storeId,
            'courierId': this.courierId
        });

        if (response.ok) {
            if (response.result.role < 3) {
                this.history.back();
            };

            this.options = response.result.options;

            this.form.controls['icon'].setValue(response.result.icon);
            this.form.controls['phone'].setValue(response.result.phone);
            this.form.controls['email'].setValue(response.result.email);
            this.form.controls['account'].setValue(response.result.account);
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
            delete this.courierId;
        };

        const response = await this.service[mode]({
            'icon': this.form.value.icon,
            'phone': this.form.value.phone,
            'email': this.form.value.email,
            'account': this.form.value.account,
            'options': this.options,
            'storeId': this.storeId,
            'courierId': this.courierId,
            'description': this.form.value.description,
            'organizationOnly': this.form.value.organizationOnly
        });

        if (response.ok) {
            this.toast.success('courier was updated!');
            this.history.back();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    public async AddOption() {
        this.optionItem.optionId = ObjectId();
        this.options.push(this.optionItem);
        this.optionItem = {};
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(async params => {
            this.mode = params.mode;
            this.storeId = params.storeId;
            this.courierId = params.courierId;

            if (this.mode != 'add') {
                await this.get();
            };
        });

        this.subscriptions.upload = this.upload.result.subscribe(icon => {
            this.form.controls['icon'].setValue(icon);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
        this.subscriptions.upload.unsubscribe();
    };

}