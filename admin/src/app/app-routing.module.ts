/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
    {
        'path':         'apis',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/apis/apis.module').then(m => m.ApisModule)
    },
    {
        'path':         'stores',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/stores/stores.module').then(m => m.StoresModule)
    },
    {
        'path':         'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path':         'signup',
        'loadChildren': () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        'path':         'reports',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
    },
    {
        'path':         'reviews',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/reviews/reviews.module').then(m => m.ReviewsModule)
    },
    {
        'path':         'couriers',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/couriers/couriers.module').then(m => m.CouriersModule)
    },
    {
        'path':         'products',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/products/products.module').then(m => m.ProductsModule)
    },
    {
        'path':         'suppliers',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/suppliers/suppliers.module').then(m => m.SuppliersModule)
    },
    {
        'path':         'departments',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/departments/departments.module').then(m => m.DepartmentsModule)
    },
    {
        'path':         'collection-points',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/collection-points/collection-points.module').then(m => m.CollectionPointsModule)
    },
    {
        'path':         'verify-account',
        'loadChildren': () => import('./pages/verify-account/verify-account.module').then(m => m.VerifyAccountModule)
    },
    {
        'path':         'privacy-policy',
        'loadChildren': () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
    },
    {
        'path':         'terms-and-conditions',
        'loadChildren': () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
    },
    {
        'path':         '**',
        'redirectTo':   'stores'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}