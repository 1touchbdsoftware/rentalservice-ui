import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-free-trial',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './free-trial.component.html',
  styleUrl: './free-trial.component.css'
})
export class FreeTrialComponent {
  constructor(private router: Router) {
  }
  
  backToHome(): void {
    this.router.navigate(['/primary-header']); // Navigate to HeaderComponent
  }

  selectedService: string | null = null;
  onCheckboxChange(value: string): void {
    this.selectedService = this.selectedService === value ? null : value;
  }

  
}

