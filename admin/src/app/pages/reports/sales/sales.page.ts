import { Papa } from 'ngx-papaparse';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy } from '@angular/core';

export const MY_FORMATS = {
    'parse': {
        'dateInput': 'MM/YYYY',
    },
    'display': {
        'dateInput': 'MM/YYYY',
        'dateA11yLabel': 'LL',
        'monthYearLabel': 'MMM YYYY',
        'monthYearA11yLabel': 'MMMM YYYY',
    }
};

@Component({
    selector: 'sales-report',
    styleUrls: ['./sales.page.scss'],
    templateUrl: './sales.page.html',
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: MY_FORMATS
        }
    ],
})

export class SalesReportPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, private papa: Papa, private route: ActivatedRoute, private router: Router, private service: ReportsService) { };

    public date: FormControl = new FormControl(moment(), [Validators.required]);
    public sales: MatTableDataSource<any> = new MatTableDataSource<any>();
    public columns: string[] = [
        'orderId',
        'email',
        'date',
        'subtotal',
        'vat',
        'total'
    ];
    public summary: any = {
        'vat': 0,
        'total': 0,
        'subtotal': 0
    };
    public loading: boolean;
    private storeId: string;
    private subscriptions: any = {};

    public download() {
        const data = this.papa.unparse(this.sales.data.map(o => {
            return {
                'Order ID': ['#', o.orderId].join(''),
                'Email': o.email,
                'Date': moment(o.date).format('YYYY/MM/DD HH:mm'),
                'Sub Total': ['R', parseFloat(o.subtotal).toFixed(2)].join(''),
                'VAT': ['R', parseFloat(o.vat).toFixed(2)].join(''),
                'Total': ['R', parseFloat(o.total).toFixed(2)].join('')
            };
        }));
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv;charset=utf-8;'}));
        link.setAttribute('download', [this.storeId, '-', 'sales', '-', moment(this.date.value.toDate()).format('MM-YYYY'), '.csv'].join(''));
        link.click();
    };

    private async load() {
        this.loading = true;
        
        this.sales.data = [];
        
        let date: any = JSON.parse(JSON.stringify(this.date.value.toDate()));
        let params: any = {
            'date': {
                'to': date,
                'from': date
            },
            'filter': [
                'vat',
                'date',
                'email',
                'total',
                'orderId',
                'subtotal'
            ],
            'storeId': this.storeId
        };

        params.date.to = new Date(params.date.to);
        params.date.to.setMonth(new Date(params.date.to).getMonth() + 1);
        params.date.to.setDate(0);
        params.date.to.setHours(23);
        params.date.to.setMinutes(59);
        params.date.to.setSeconds(59);
        params.date.to.setMilliseconds(999);
        params.date.from = new Date(params.date.from);
        params.date.from.setDate(1);
        params.date.from.setHours(0);
        params.date.from.setMinutes(0);
        params.date.from.setSeconds(0);
        params.date.from.setMilliseconds(0);

        const response = await this.service.sales(params);

        if (response.ok) {
            this.summary.vat = 0;
            this.summary.total = 0;
            this.summary.subtotal = 0;
            this.sales.data = response.result;
            this.sales.data.map(item => {
                this.summary.vat += item.vat;
                this.summary.total += item.total;
                this.summary.subtotal += item.subtotal;
            });
        } else {
            this.sales.data = [];
        };

        this.loading = false;
    };

    public async year(normalizedYear: Moment) {
        const ctrlValue = this.date.value;
        ctrlValue.year(normalizedYear.year());
        this.date.setValue(ctrlValue);
    };

    public async month(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.month(normalizedMonth.month());
        this.date.setValue(ctrlValue);
        datepicker.close();
        this.load();
    };

    ngOnInit(): void {
        this.subscriptions.date = this.date.valueChanges.subscribe(date => {
            if (date.isValid()) {
                this.load();
            };
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (typeof(params.storeId) != 'undefined' && params.storeId != null && params.storeId != '') {
                this.storeId = params.storeId;
                this.load();
            } else {
                this.router.navigate(['/stores']);
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.date.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}