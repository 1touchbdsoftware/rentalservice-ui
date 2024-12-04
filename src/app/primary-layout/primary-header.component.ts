import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-primary-header',
  standalone: true,
  imports: [ 
    RouterLink,
    CommonModule, // Include this for *ngIf
  ],
  templateUrl: './primary-header.component.html',
  styleUrl: './primary-header.component.css'
})

export class PrimaryHeaderComponent {
  private router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url == '/login';
  }

  isBuyNowPage(): boolean {
    return this.router.url == '/buy-now';
  }

  isFreeTrialPage(): boolean {
    return this.router.url == '/free-trial';
  }


}