/* --- PAGES --- */
import { CouriersPage } from './couriers.page';
import { CourierEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/components/share/share.module';
import { OrderModule } from 'src/app/libs/order/order.module';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OptionsSheetModule } from 'src/app/components/options-sheet/options-sheet.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CouriersRoutingModule } from './couriers-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'src/app/components/file-upload/file-upload.module';

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
        CouriersRoutingModule
    ],
    declarations: [
        CouriersPage,
        CourierEditorPage
    ]
})

export class CouriersModule {}