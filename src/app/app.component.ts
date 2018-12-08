import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from './order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OrderService]
})
export class AppComponent implements OnInit {
  private orderId: string;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId = params['order_id'];
      if (orderId) {
        this.addAutoCloseableAlert(orderId);
      }
    });
  }

  addAutoCloseableAlert(orderId: string) {
    this.orderId = orderId;
    setTimeout(() => this.removeAlert(), 3000);
  }

  removeAlert() {
    this.orderId = null;
  }
}
