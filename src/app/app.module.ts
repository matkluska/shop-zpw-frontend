import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './component/app.component';
import {ProductComponent} from './component/shop/product/product.component';
import {ProductsComponent} from './component/shop/products/products.component';
import {SafePipe} from './pipe/safe.pipe';
import {NewProductComponent} from './component/management/new-product/new-product.component';
import {ShoppingCartComponent} from './component/shop/shopping-cart/shopping-cart.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CategoriesPipe} from './pipe/categories.pipe';
import {FiltersComponent} from './component/shop/filters/filters.component';
import {PriceRangePipe} from './pipe/price-range.pipe';
import {OrderComponent} from './component/shop/order/order.component';
import {environment} from '../environments/environment';
import {DashboardComponent} from './component/shop/dashboard/dashboard.component';
import {AuthGuard} from './guard/auth-guard';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ManagementPanelComponent} from './component/management/management-panel/management-panel.component';
import {EmployeeGuard} from './guard/employee-guard';
import {ManagementProductsComponent} from './component/management/management-products/management-products.component';
import {ManagementOrdersComponent} from './component/management/management-orders/management-orders.component';
import {AdminGuard} from './guard/admin-guard';
import {EditProductComponent} from './component/management/edit-product/edit-product.component';
import {BackendTypeService} from './service/backend-type.service';
import {configuration} from '../environments/config';
import {BackendTypeComponent} from './component/management/backend-type/backend-type.component';
import {NewTimeDiscountComponent} from './component/management/new-time-discount/new-time-discount.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'order', component: OrderComponent}
    ]
  },
  {
    path: 'admin', component: ManagementPanelComponent, canActivate: [EmployeeGuard], children: [
      {path: '', component: ManagementOrdersComponent},
      {path: 'products', component: ManagementProductsComponent, canActivate: [AdminGuard]},
      {path: 'new-product', component: NewProductComponent, canActivate: [AdminGuard]},
      {path: 'edit-product', component: EditProductComponent, canActivate: [AdminGuard]},
      {path: 'configuration', component: BackendTypeComponent, canActivate: [AdminGuard]},
      {path: 'time-discount', component: NewTimeDiscountComponent, canActivate: [AdminGuard]}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

export function getConfiguration(backendTypeService: BackendTypeService) {
  return () => backendTypeService.getConfig()
    .toPromise()
    .then(config => configuration.backend = config.backend);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    NewProductComponent,
    ShoppingCartComponent,
    FiltersComponent,
    OrderComponent,
    SafePipe,
    CategoriesPipe,
    PriceRangePipe,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ManagementPanelComponent,
    ManagementProductsComponent,
    ManagementOrdersComponent,
    EditProductComponent,
    BackendTypeComponent,
    NewTimeDiscountComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    BackendTypeService,
    {
      provide: APP_INITIALIZER,
      useFactory: getConfiguration,
      deps: [BackendTypeService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
