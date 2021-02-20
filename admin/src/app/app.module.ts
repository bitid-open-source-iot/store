/* --- MODULES --- */
import { NgModule } from '@angular/core';
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
import { ToastService } from './services/toast/toast.service';
import { StoresService } from './services/stores/stores.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENTS --- */
import { environment } from '../environments/environment';

@NgModule({
    imports: [
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
        ToastService,
        ConfigService,
        StoresService,
        AccountService,
        ButtonsService,
        FormErrorService,
        LocalstorageService
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }
