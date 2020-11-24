// libs
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// services
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
