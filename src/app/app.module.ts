import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './products/products.component';
import {SafePipe} from '../safe-pipe';
import {NewProductComponent} from './new-product/new-product.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

const appRoutes: Routes = [
  {path: 'products', component: ProductsComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: '', component: ProductsComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductsComponent,
    SafePipe,
    NewProductComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
