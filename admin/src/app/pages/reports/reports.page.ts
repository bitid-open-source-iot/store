import { MenuService } from 'src/app/services/menu/menu.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-reports-page',
    styleUrls: ['./reports.page.scss'],
    templateUrl: './reports.page.html'
})

export class ReportsPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService) { };

    public reports: MatTableDataSource<any> = new MatTableDataSource<any>();
    public columns: string[] = ['description'];
    public loading: boolean;
    private subscriptions: any = {};

    ngOnInit(): void {
        this.reports.data = [
            {
                'route': 'sales',
                'description': 'Monthly Sales Report'
            }
        ];
    };

    ngOnDestroy(): void { };

}