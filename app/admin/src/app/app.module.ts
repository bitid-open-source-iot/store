/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { SearchModule } from './libs/search/search.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SplashscreenModule } from './libs/splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { AppsService } from './services/apps/apps.service';
import { ToastService } from './services/toast/toast.service';
import { ConfigService } from './services/config/config.service';
import { OrdersService } from './services/orders/orders.service';
import { StoresService } from './services/stores/stores.service';
import { AccountService } from './services/account/account.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { ReviewsService } from './services/reviews/reviews.service';
import { FiltersService } from './services/filters/filters.service';
import { ProductsService } from './services/products/products.service';
import { CouriersService } from './services/couriers/couriers.service';
import { VouchersService } from './services/vouchers/vouchers.service';
import { CustomersService } from './services/customers/customers.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { SuppliersService } from './services/suppliers/suppliers.service';
import { DepartmentsService } from './services/departments/departments.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { CollectionPointsService } from './services/collection-points/collection-points.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENTS --- */
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        SearchModule,
        BrowserModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatRippleModule,
        MatButtonModule,
        AppRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        HttpClientModule,
        MatSnackBarModule,
        SplashscreenModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production
        })
    ],
    providers: [
        ApiService,
        AuthService,
        AppsService,
        ToastService,
        ConfigService,
        OrdersService,
        StoresService,
        AccountService,
        ButtonsService,
        ReviewsService,
        FiltersService,
        VouchersService,
        ProductsService,
        CouriersService,
        CustomersService,
        FormErrorService,
        SuppliersService,
        DepartmentsService,
        LocalstorageService,
        CollectionPointsService
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }
