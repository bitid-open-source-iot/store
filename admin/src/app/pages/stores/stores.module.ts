/* --- PAGES --- */
import { StoresPage } from './stores.page';
import { StoreEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/components/share/share.module';
import { OrderModule } from 'src/app/libs/order/order.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'src/app/components/file-upload/file-upload.module';
import { SubscribersModule } from 'src/app/components/subscribers/subscribers.module';
import { UnsubscribeModule } from 'src/app/components/unsubscribe/unsubscribe.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OptionsSheetModule } from 'src/app/components/options-sheet/options-sheet.module';
import { StoresRoutingModule } from './stores-routing.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ShareModule,
        FormsModule,
        OrderModule,
        CommonModule,
        SearchModule,
        FilterModule,
        MatIconModule,
        DeleteModule,
        MatListModule,
        MatInputModule,
        MatChipsModule,
        MatSelectModule,
        MatButtonModule,
        MatRippleModule,
        FileUploadModule,
        MatToolbarModule,
        SubscribersModule,
        UnsubscribeModule,
        OptionsSheetModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        StoresRoutingModule,
        MatBottomSheetModule,
        MatProgressBarModule
    ],
    declarations: [
        StoresPage,
        StoreEditorPage
    ]
})

export class StoresModule {}