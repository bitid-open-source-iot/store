/* --- PAGES --- */
import { SuppliersPage } from './suppliers.page';
import { SupplierEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/libs/order/order.module';
import { ShareModule } from 'src/app/components/share/share.module';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'src/app/components/file-upload/file-upload.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OptionsSheetModule } from 'src/app/components/options-sheet/options-sheet.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        OrderModule,
        ShareModule,
        FormsModule,
        FilterModule,
        SearchModule,
        DeleteModule,
        CommonModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatRippleModule,
        MatToolbarModule,
        FileUploadModule,
        MatFormFieldModule,
        OptionsSheetModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        SuppliersRoutingModule
    ],
    declarations: [
        SuppliersPage,
        SupplierEditorPage
    ]
})

export class SuppliersModule {}