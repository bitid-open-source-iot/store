import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-api-editor-page',
    styleUrls:      ['./editor.page.scss'],
    templateUrl:    './editor.page.html'
})

export class ApiEditorPage implements OnInit, OnDestroy {

    constructor(private formerror: FormErrorService) {};

    public form: FormGroup = new FormGroup({
        'description': new FormControl('', [Validators.required])
    });
    public errors: any = {
        'description': ''
    };
    public loading: boolean;
    public subscriptions: any = {};

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}