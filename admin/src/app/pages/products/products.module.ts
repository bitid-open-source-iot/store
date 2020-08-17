/* --- PAGES --- */
import { ProductsPage } from './products.page';
import { ProductEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/libs/order/order.module';
import { ShareModule } from 'src/app/components/share/share.module';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/libs/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        OrderModule,
        ShareModule,
        SearchModule,
        FilterModule,
        DeleteModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        ProductsRoutingModule
    ],
    declarations: [
        ProductsPage,
        ProductEditorPage
    ]
})

export class ProductsModule {}