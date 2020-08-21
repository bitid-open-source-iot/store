/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
	{
        'path':         'cart',
        'loadChildren': () => import('./pages/cart/cart.module').then(m => m.CartModule)
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
        'path':         'orders',
        'canActivate':  [AuthService],
        'loadChildren': () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
	},
    {
        'path':         'wishlist',
        'loadChildren': () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule)
	},
    {
        'path':         'checkout',
        'loadChildren': () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
	},
    {
        'path':         'products',
        'loadChildren': () => import('./pages/products/products.module').then(m => m.ProductsModule)
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
		'path': 		'**',
		'redirectTo': 	'products'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}