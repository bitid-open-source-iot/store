/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OrderModule } from './libs/order/order.module';
import { VersionModule } from './libs/version/version.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { MenuService } from './services/menu/menu.service';
import { ApisService } from './services/apis/apis.service';
import { ToastService } from './services/toast/toast.service';
import { StoresService } from './services/stores/stores.service';
import { HistoryService } from './services/history/history.service';
import { AccountService } from './services/account/account.service';
import { ReviewsService } from './services/reviews/reviews.service';
import { CouriersService } from './services/couriers/couriers.service';
import { ProductsService } from './services/products/products.service';
import { SuppliersService } from './services/suppliers/suppliers.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { DepartmentsService } from './services/departments/departments.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { CollectionPointsService } from './services/collection-points/collection-points.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENT --- */
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        OrderModule,
        BrowserModule,
        MatListModule,
        MatIconModule,
        VersionModule,
        MatButtonModule,
        AppRoutingModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        SplashscreenModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        ApiService,
        AuthService,
        MenuService,
        ApisService,
        ToastService,
        StoresService,
        AccountService,
        ReviewsService,
        HistoryService,
        CouriersService,
        ProductsService,
        SuppliersService,
        FormErrorService,
        DepartmentsService,
        LocalstorageService,
        CollectionPointsService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}