import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  showSuccessModal = false;
  showVerificationChoiceModal = false;
  showOtpInputModal = false;
  verificationMethod: 'PHONE' | 'EMAIL' | null = null;
  otpInputs: string[] = ['', '', '', '', '', ''];
  otpExpired = false;
  timeLeft = 0;
  Message: string = '';
  emailVerified = false;
  phoneVerified = false;
  timer: any;
  otpExpiredMessage = '';
  otpErrorMessage = '';
  pendingRegistrationData: User; // or User if you have a model

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]],

      confirmPassword: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
      userRole: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void { }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {


    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.pendingRegistrationData = this.registerForm.value;
    this.verificationMethod = 'PHONE';
    this.sendOtp(this.pendingRegistrationData.mobileNumber);


  }

  onModalOk(): void {
    this.showSuccessModal = false;
    this.registerForm.patchValue({ approved: true });
    this.router.navigate(['/login']);
  }

 

  verifyOtp(): void {
    const key = this.verificationMethod === 'EMAIL'
      ? this.pendingRegistrationData.email
      : this.pendingRegistrationData.mobileNumber;

    const otp = this.otpInputs.join('');

    this.service.verifyOtp(key, otp, this.verificationMethod).subscribe(response => {
      if (response === 'OTP Verified Successfully') {
        clearInterval(this.timer);
        this.showOtpInputModal = false;
        this.otpInputs = ['', '', '', '', '', ''];

        if (this.verificationMethod === 'PHONE') {
          this.phoneVerified = true;
          this.verificationMethod = 'EMAIL';
          this.sendOtp(this.pendingRegistrationData.email);
        } else if (this.verificationMethod === 'EMAIL') {
          this.emailVerified = true;
          this.pendingRegistrationData.approved = true; // ✅ Set approved to true
          this.registerUser(); // ✅ Final step
        }
      } else {
        this.otpErrorMessage = 'Invalid OTP. Please try again.';
        this.resetOtpInputs();
      }
    });
  }

  resendOtp(): void {
    const key = this.verificationMethod === 'EMAIL' ? this.registerForm.value.email : this.registerForm.value.mobileNumber;
    this.service.sendOtp(key, this.verificationMethod).subscribe(() => {
      this.otpInputs = ['', '', '', '', '', ''];
      this.timeLeft = 60;
      this.startOtpTimer();
      this.otpExpired = false;
      this.otpErrorMessage = '';
      this.otpExpiredMessage = '';
    });
  }

  onOtpInput(index: number, event: any): void {
    const inputValue = event.target.value;
    if (!/^\d$/.test(inputValue)) return;
    this.otpInputs[index] = inputValue;

    if (index < this.otpInputs.length - 1) {
      setTimeout(() => {
        const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement;
        if (nextInput) {
          nextInput.value = '';
          nextInput.focus();
          nextInput.select();
        }
      }, 0);
    }
  }

  resetOtpInputs(): void {
    this.otpInputs = ['', '', '', '', '', ''];
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach(input => (input as HTMLInputElement).value = '');
  }

  startOtpTimer(): void {
    this.timeLeft = 60;
    this.otpExpired = false;
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.otpExpired = true;
        this.otpExpiredMessage = 'OTP has expired. Please request a new one.';
        this.resetOtpInputs();
      }
    }, 1000);
  }

  sendOtp(key: string): void {
    this.service.sendOtp(key, this.verificationMethod).subscribe(() => {
      this.showOtpInputModal = true;
      this.startOtpTimer();
    });

  }
  registerUser(): void {
    this.pendingRegistrationData.approved = true;


    this.service.register(this.pendingRegistrationData).subscribe(
      () => {
        this.showSuccessModal = true;

        setTimeout(() => this.onModalOk(), 1500);
      },
      error => {
        alert('Registration failed. Please try again.');
      }
    );
  }




}