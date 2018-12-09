import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.css']
})
export class ManagementPanelComponent implements OnInit {
  private isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  logoutUser() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log(err));
  }

}
