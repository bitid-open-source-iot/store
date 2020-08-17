/* --- PAGES --- */
import { CollectionPointsPage } from './collection-points.page';
import { CollectionPointEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from 'src/app/libs/order/order.module';
import { ShareModule } from 'src/app/components/share/share.module';
import { CommonModule } from '@angular/common';
import { FilterModule } from 'src/app/libs/filter/filter.module';
import { SearchModule } from 'src/app/libs/search/search.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OptionsSheetModule } from 'src/app/components/options-sheet/options-sheet.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CollectionPointsRoutingModule } from './collection-points-routing.module';
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
        MatFormFieldModule,
        OptionsSheetModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        CollectionPointsRoutingModule
    ],
    declarations: [
        CollectionPointsPage,
        CollectionPointEditorPage
    ]
})

export class CollectionPointsModule {}