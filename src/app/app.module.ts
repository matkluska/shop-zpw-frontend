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

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', component: ProductsComponent},
      {path: 'new-product', component: NewProductComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'order', component: OrderComponent}
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
    RegisterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
