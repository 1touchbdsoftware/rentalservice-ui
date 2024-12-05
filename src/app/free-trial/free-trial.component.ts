import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-free-trial',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './free-trial.component.html',
  styleUrl: './free-trial.component.css'
})
export class FreeTrialComponent {
  constructor(private router: Router) {
  }

  backToHome(): void {
    this.router.navigate(['/primary-header']);
  }

  selectedService: string | null = null;
  onCheckboxChange(value: string): void {
    this.selectedService = this.selectedService === value ? null : value;
  }

  // define form model
  formData = {
    name: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    selectedService: null
  };

  // handle form submission
  onSubmit(): void {
    console.log('Form Submitted!', this.formData);
  }


}

