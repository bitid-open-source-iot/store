/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { VersionModule } from './libs/version/version.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { CartService } from './services/cart/cart.service';
import { MenuService } from './services/menu/menu.service';
import { ToastService } from './services/toast/toast.service';
import { StoresService } from './services/stores/stores.service';
import { OrdersService } from './services/orders/orders.service';
import { ReviewsService } from './services/reviews/reviews.service';
import { HistoryService } from './services/history/history.service';
import { AccountService } from './services/account/account.service';
import { WishlistService } from './services/wishlist/wishlist.service';
import { ProductsService } from './services/products/products.service';
import { CouriersService } from './services/couriers/couriers.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { CollectionPointsService } from './services/collection-points/collection-points.service';
 
/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENT --- */
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        MatIconModule,
        MatListModule,
        VersionModule,
        MatButtonModule,
        AppRoutingModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        SplashscreenModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            'enabled': environment.production
        })
    ],
    providers: [
        ApiService,
        AuthService,
        AuthService,
        CartService,
        MenuService,
        ToastService,
        OrdersService,
        StoresService,
        ReviewsService,
        HistoryService,
        AccountService,
        CouriersService,
        WishlistService,
        ProductsService,
        FormErrorService,
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

export class AppModule {}