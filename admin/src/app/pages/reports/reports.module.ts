/* --- PAGES --- */
import { ReportsPage } from './reports.page';
import { SalesReportPage } from './sales/sales.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    {
        'path': '',
        'component': ReportsPage
    },
    {
        'path': 'sales',
        'component': SalesReportPage
    }
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ReportsPage,
        SalesReportPage
    ]
})

export class ReportsModule { }