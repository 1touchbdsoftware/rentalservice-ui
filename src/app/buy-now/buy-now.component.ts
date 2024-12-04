import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './buy-now.component.html',
  styleUrl: './buy-now.component.css'
})
export class BuyNowComponent {
  constructor(private router: Router) {

   }

   backToHome(): void {
    this.router.navigate(['/primary-header']); 
  }

  selectedService: string | null = null;
  onCheckboxChange(value: string): void {
    this.selectedService = this.selectedService === value ? null : value;
  }
  
}
