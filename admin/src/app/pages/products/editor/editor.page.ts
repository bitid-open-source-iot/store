import { Product } from 'src/app/interfaces/product';
import { Supplier } from 'src/app/interfaces/supplier';
import { Department } from 'src/app/interfaces/department';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from 'src/app/services/history/history.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { SuppliersService } from 'src/app/services/suppliers/suppliers.service';
import { DepartmentsService } from 'src/app/services/departments/departments.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-product-editor-page',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class ProductEditorPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, public history: HistoryService, private service: ProductsService, private _suppliers: SuppliersService, private _departments: DepartmentsService, private localstorage: LocalstorageService, private formerror: FormErrorService) { };

    public mode: string;
    public form: FormGroup = new FormGroup({
        'promotion': new FormGroup({
            'price': new FormControl(0, [Validators.required, Validators.min(0)]),
            'enabled': new FormControl(false, [Validators.required])
        }),
        'cost': new FormControl(0, [Validators.required, Validators.min(0)]),
        'type': new FormControl('pyhsical', [Validators.required]),
        'links': new FormControl([]),
        'title': new FormControl(null, [Validators.required]),
        'price': new FormControl(0, [Validators.required, Validators.min(0)]),
        'visible': new FormControl(true, [Validators.required]),
        'supplierId': new FormControl(null, [Validators.required]),
        'departments': new FormControl([], [Validators.required]),
        'description': new FormControl(null, [Validators.required]),
        'organizationOnly': new FormControl(1, [Validators.required])
    });
    public errors: any = {
        'promotion': {
            'price': '',
            'enabled': ''
        },
        'cost': '',
        'type': '',
        'links': '',
        'title': '',
        'price': '',
        'visible': '',
        'supplierId': '',
        'departments': '',
        'description': '',
        'organizationOnly': ''
    };
    public info: any[] = [];
    public images: any[] = [];
    public storeId: string;
    public loading: boolean;
    public products: Product[] = [];
    public infoItem: any = {};
    public uploading: boolean;
    public productId: string;
    public suppliers: Supplier[] = [];
    public departments: Department[] = [];
    public subscriptions: any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'info',
                'cost',
                'type',
                'links',
                'title',
                'price',
                'images',
                'visible',
                'storeId',
                'productId',
                'promotion',
                'supplierId',
                'departments',
                'description',
                'organizationOnly'
            ],
            'storeId': this.storeId,
            'productId': this.productId
        });

        if (response.ok) {
            if (response.result.role < 3) {
                this.history.back();
            };

            this.info = response.result.info;
            this.images = response.result.images;

            const promotion: FormGroup = <any>this.form.controls['promotion'];
            promotion.controls['price'].setValue(response.result.promotion.price);
            promotion.controls['enabled'].setValue(response.result.promotion.enabled);

            this.form.controls['cost'].setValue(response.result.cost);
            this.form.controls['type'].setValue(response.result.type);
            this.form.controls['links'].setValue(response.result.links);
            this.form.controls['title'].setValue(response.result.title);
            this.form.controls['price'].setValue(response.result.price);
            this.form.controls['visible'].setValue(response.result.visible);
            this.form.controls['supplierId'].setValue(response.result.supplierId);
            this.form.controls['departments'].setValue(response.result.departments);
            this.form.controls['description'].setValue(response.result.description);
            this.form.controls['organizationOnly'].setValue(response.result.organizationOnly);
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    private async load() {
        this.loading = true;

        const products = await this.service.list({
            'filter': [
                'title',
                'productId'
            ],
            'storeId': this.storeId
        });

        if (products.ok) {
            this.products = products.result;
        };

        const suppliers = await this._suppliers.list({
            'filter': [
                'supplierId',
                'description'
            ],
            'storeId': this.storeId
        });

        if (suppliers.ok) {
            this.suppliers = suppliers.result;
        };

        const departments = await this._departments.list({
            'filter': [
                'description',
                'departmentId'
            ],
            'storeId': this.storeId
        });

        if (departments.ok) {
            this.departments = departments.result;
        };

        this.loading = false;
    };

    public async submit() {
        this.loading = true;

        let mode = this.mode;
        if (mode == 'copy') {
            mode = 'add';
            delete this.productId;
        };

        const response = await this.service[mode]({
            'info': this.info,
            'cost': this.form.value.cost,
            'type': this.form.value.type,
            'links': this.form.value.links,
            'title': this.form.value.title,
            'price': this.form.value.price,
            'images': this.images,
            'visible': this.form.value.visible,
            'storeId': this.storeId,
            'productId': this.productId,
            'promotion': this.form.value.promotion,
            'supplierId': this.form.value.supplierId,
            'departments': this.form.value.departments,
            'description': this.form.value.description,
            'organizationOnly': this.form.value.organizationOnly
        });

        if (response.ok) {
            this.toast.success('product was updated!');
            this.history.back();
        } else {
            this.toast.error(response.error.message);
        };

        this.loading = false;
    };

    public async upload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
        input.onchange = async (event: any) => {
            this.uploading = true;
            const url = [environment.drive, '/drive/files/upload?email=', this.localstorage.get('email'), '&appId=', environment.appId].join('');
            const form = new FormData();
            const request = new XMLHttpRequest();

            for (var i = 0; i < event.target.files.length; i++) {
                form.append("uploads[]", event.target.files[i], event.target.files[i].name);
            };

            request.onreadystatechange = (event) => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        const response = JSON.parse(request.response);
                        this.images.push({
                            'src': [environment.drive, '/drive/files/get?fileId=', response.fileId, "&token=", response.token].join(''),
                            'main': (this.images.length == 0 ? true : false),
                            'positon': this.images.length
                        });
                        this.uploading = false;
                    } else {
                        this.toast.error('issue uploading image!');
                        this.uploading = false;
                    };
                };
            };

            request.open("POST", url, true);
            request.setRequestHeader('Authorization', this.localstorage.get('token'));
            request.send(form);
        };
    };

    public async SetMain(image) {
        this.images.map(o => {
            o.main = false;
            if (image.src == o.src) {
                o.main = true;
            };
        });
    };

    public async AddInfo() {
        this.info.push(this.infoItem);
        this.infoItem = {};
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(async params => {
            this.mode = params.mode;
            this.storeId = params.storeId;
            this.productId = params.productId;

            await this.load();

            if (this.mode != 'add') {
                await this.get();
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}