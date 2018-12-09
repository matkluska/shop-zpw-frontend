import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';


import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './products/products.component';
import {SafePipe} from './pipes/safe.pipe';
import {NewProductComponent} from './new-product/new-product.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CategoriesPipe} from './pipes/categories.pipe';
import {FiltersComponent} from './filters/filters.component';
import {PriceRangePipe} from './pipes/price-range.pipe';
import {OrderComponent} from './order/order.component';
import {environment} from '../environments/environment';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth-guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ManagementPanelComponent} from './management-panel/management-panel.component';
import {EmployeeGuard} from './employee-guard';
import {ManagementProductsComponent} from './management-products/management-products.component';
import {ManagementOrdersComponent} from './management-orders/management-orders.component';
import {AdminGuard} from './admin-guard';
import { EditProductComponent } from './edit-product/edit-product.component';

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
      {path: 'edit-product', component: EditProductComponent, canActivate: [AdminGuard]}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

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
    EditProductComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
