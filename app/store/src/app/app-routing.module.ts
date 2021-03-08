/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
    {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'orders',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersPageModule)
    },
    {
        path: 'product',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule)
    },
    {
        path: 'checkout',
        loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule)
    },
    {
        path: 'wishlist',
        loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistPageModule)
    },
    {
        path: 'vouchers',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/vouchers/vouchers.module').then(m => m.VouchersPageModule)
    },
    {
        path: 'authenticate',
        loadChildren: () => import('./pages/authenticate/authenticate.module').then(m => m.AuthenticatePageModule)
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
