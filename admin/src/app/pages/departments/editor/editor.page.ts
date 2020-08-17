import { ToastService } from 'src/app/services/toast/toast.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { ActivatedRoute } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-department-editor-page',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class DepartmentEditorPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, private service: DepartmentsService, public history: HistoryService, private formerror: FormErrorService) { };

    public mode: string;
    public form: FormGroup = new FormGroup({
        'description': new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl(1, [Validators.required])
    });
    public errors: any = {
        'description': '',
        'organizationOnly': ''
    };
    public storeId: string;
    public loading: boolean;
    public departmentId: string;
    public subscriptions: any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'description',
                'organizationOnly'
            ],
            'storeId': this.storeId,
            'departmentId': this.departmentId
        });

        if (response.ok) {
            if (response.result.role < 3) {
                this.history.back();
            };

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
            delete this.departmentId;
        };

        const response = await this.service[mode]({
            'storeId': this.storeId,
            'description': this.form.value.description,
            'departmentId': this.departmentId,
            'organizationOnly': this.form.value.organizationOnly
        });

        if (response.ok) {
            this.toast.success('department was updated!');
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
            this.departmentId = params.departmentId;

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