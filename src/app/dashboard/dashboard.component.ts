import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [OrderService, AuthService]
})
export class DashboardComponent implements OnInit {
  private orderId: string;

  constructor(private orderService: OrderService, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
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

  logoutUser() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err));
  }
}
