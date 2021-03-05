import { Store } from 'src/app/classes/store';
import { StoresService } from 'src/app/services/stores/stores.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'vouchers-filter-dialog',
    styleUrls: ['./filter.dialog.scss'],
    templateUrl: './filter.dialog.html',
    encapsulation: ViewEncapsulation.None
})

export class VouchersFilterDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<VouchersFilterDialog>, @Inject(MAT_DIALOG_DATA) public config, public stores: StoresService, private formerror: FormErrorService) { }

    public form: FormGroup = new FormGroup({
        storeId: new FormControl([])
    });
    public filter: FormGroup = new FormGroup({
        store: new FormControl('')
    });
    public errors: any = {
        storeId: ''
    };
    public loading: boolean;
    private subscriptions: any = {}

    private async load() {
        this.loading = true;
        
        const stores = await this.stores.list({
            filter: [
                'storeId',
                'description'
            ]
        });

        if (stores.ok) {
            this.stores.data = stores.result.map(o => new Store(o));
        } else {
            this.stores.data = [];
        }

        if (typeof(this.config.storeId) != 'undefined' && this.config.storeId != null) {
            this.form.controls.storeId.setValue(this.config.storeId);
        }

        this.loading = false;
    };

    public async close() {
        this.dialog.close(false);
    };
    
    public async submit() {
        this.dialog.close(this.form.value);
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        })

        this.load();
    }

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    }

}
