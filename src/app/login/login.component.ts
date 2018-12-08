import {Component, OnInit} from '@angular/core';
import {AuthService, Credentials} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;
  private loginFailed = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(new Credentials(this.email, this.password))
      .then(() => this.router.navigate(['']))
      .catch(() => this.loginFailed = true);
  }
}
