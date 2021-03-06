import { Store } from 'src/app/interfaces/store';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoresService } from 'src/app/services/stores/stores.service';
import { AccountService } from 'src/app/services/account/account.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-signin',
    styleUrls:      ['./signin.page.scss'],
    templateUrl:    './signin.page.html'
})

export class SigninPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private store: StoresService, private history: HistoryService, private service: AccountService, private formerror: FormErrorService) {};

    public form:            FormGroup   = new FormGroup({
        'email':    new FormControl('', [Validators.email, Validators.required]),
        'password': new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'email':    '',
        'password': ''
    };
    public params:          any;
    public loading:         boolean;
    public merchant:        Store;
    private subscriptions:  any         = {};

    public async back() {
        this.history.back();
    };

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.login({
            'email':    this.form.value.email,
            'password': this.form.value.password
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            if (typeof(this.params.returnUrl) != 'undefined' && this.params.returnUrl != null && this.params.returnUrl != '') {
                let url     = this.params.returnUrl.split('?')
                let params  = {};
                if (url.length > 1) {
                    url[1].split('&').map(keyval => {
                        let tmp = keyval.split('=');
                        params[tmp[0]] = tmp[1];
                    });
                };
                this.router.navigate([url[0]], {
                    'replaceUrl':   true,
                    'queryParams':  params
                });
            } else {
                this.router.navigate(['/products'], {
                    'replaceUrl': true
                });
            };
        } else {
            this.toast.error(response.error.message);
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            this.params = params;
        });

        this.subscriptions.store = this.store.store.subscribe(merchant => {
            if (merchant) {
                this.merchant = merchant;
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
        this.subscriptions.store.unsubscribe();
    };

}