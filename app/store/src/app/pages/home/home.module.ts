/* --- PAGES --- */
import { HomePage } from './home.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { StarsModule } from 'src/app/libs/stars/stars.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        StarsModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatRippleModule,
        MatButtonModule,
        MatContentModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HomePage
    ]
})

export class HomePageModule { }
