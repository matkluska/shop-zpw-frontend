import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


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

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'order', component: OrderComponent},
  {path: '', component: ProductsComponent, pathMatch: 'full'}
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
    PriceRangePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
