import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {OrdersService} from '../../../service/orders-service';
import {OrdersServiceFactory} from '../../../service/orders-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    {
      provide: OrdersService,
      useFactory: OrdersServiceFactory,
      deps: [AngularFirestore, HttpClient]
    },
    AuthService]
})
export class DashboardComponent implements OnInit {
  private orderId: string;
  private isEmployee: boolean;

  constructor(private orderService: OrdersService, private authService: AuthService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId = params['order_id'];
      if (orderId) {
        this.addAutoCloseableAlert(orderId);
      }
    });
    this.authService.isEmployee().subscribe(isEmployee => this.isEmployee = isEmployee);
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
