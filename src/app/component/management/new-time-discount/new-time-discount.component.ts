import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {SocketService} from '../../../service/socket.service';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';
import {Product} from '../../../model/product';
import {TimeDiscount} from '../../../model/time-discount';

@Component({
  selector: 'app-new-time-discount',
  templateUrl: './new-time-discount.component.html',
  styleUrls: ['./new-time-discount.component.css'],
  providers: [SocketService,
    {
      provide: ProductsService,
      useFactory: ProductsServiceFactory,
      deps: [AngularFirestore, HttpClient]
    }
  ]
})
export class NewTimeDiscountComponent implements OnInit {
  private product: Product = new Product('', '', 0, 0, '', '', 'other');
  private timeDiscount: TimeDiscount = new TimeDiscount('', '', 0, 0);

  constructor(private productsService: ProductsService, private socketService: SocketService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const productId = params['product_id'];
      if (productId) {
        this.productsService.getProduct(productId).subscribe(product => {
            this.product = product;
            this.timeDiscount.productName = product.name;
            this.timeDiscount.productId = product.id;
          }
        );
      }
    });
  }

  onSubmit() {
    if (this.timeDiscount.discountPercent > 0 && this.timeDiscount.endTime > 0) {
      const endTimeInMillis = this.timeDiscount.endTime * 60 * 1000;
      const discountEndTime = Date.now() + endTimeInMillis;
      this.productsService.updateProduct({
        ...this.product, discount_percent: this.timeDiscount.discountPercent, discount_end_time: discountEndTime
      }).then(() => this.socketService.send({...this.timeDiscount, endTime: endTimeInMillis}));
    }
  }
}
