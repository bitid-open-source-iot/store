/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
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
        path: 'stores',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/stores/stores.module').then(m => m.StoresPageModule)
    },
    {
        path: 'reviews',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsPageModule)
    },
    {
        path: 'products',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule)
    },
    {
        path: 'couriers',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/couriers/couriers.module').then(m => m.CouriersPageModule)
    },
    {
        path: 'suppliers',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/suppliers/suppliers.module').then(m => m.SuppliersPageModule)
    },
    {
        path: 'customers',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersPageModule)
    },
    {
        path: 'departments',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/departments/departments.module').then(m => m.DepartmentsPageModule)
    },
    {
        path: 'subscribers',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/subscribers/subscribers.module').then(m => m.SubscribersPageModule)
    },
    {
        path: 'authenticate',
        loadChildren: () => import('./pages/authenticate/authenticate.module').then(m => m.AuthenticatePageModule)
    },
    {
        path: 'collection-points',
        canActivate: [AuthService],
        loadChildren: () => import('./pages/collection-points/collection-points.module').then(m => m.CollectionPointsPageModule)
    },
    {
        path: '**',
        redirectTo: 'stores'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
