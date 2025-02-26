import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogin(): void {
    this.auth.login();
    this.router.navigateByUrl('/facesnaps');
  }
}
