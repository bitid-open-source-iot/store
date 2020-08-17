import { Store } from 'src/app/interfaces/store';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { AccountService } from 'src/app/services/account/account.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-signup',
    styleUrls:      ['./signup.page.scss'],
    templateUrl:    './signup.page.html'
})

export class SignupPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, private router: Router, private store: StoresService, private history: HistoryService, private service: AccountService, private formerror: FormErrorService) {};

    public form:            FormGroup   = new FormGroup({
        'name': new FormGroup({
            'last':     new FormControl('', [Validators.required]),
            'first':    new FormControl('', [Validators.required])
        }),
        'email':    new FormControl('', [Validators.email, Validators.required]),
        'confirm':  new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'name': {
            'last':     '',
            'first':    ''
        },
        'email':    '',
        'confirm':  '',
        'password': ''
    };
    public loading:         boolean;
    public merchant:        Store;
    private subscriptions:  any         = {};

    public async back() {
        this.history.back();
    };

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.register(this.form.value);

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/verify-account'], {
                'queryParams': {
                    'email': this.form.value.email
                },
                'replaceUrl': true
            });
        } else {
            this.toast.error(response.error.message);
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.store = this.store.store.subscribe(merchant => {
            if (merchant) {
                this.merchant = merchant;
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.store.unsubscribe();
    };

}