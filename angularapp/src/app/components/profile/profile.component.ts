import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserdetailsService } from 'src/app/services/userdetails.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  profileForm: FormGroup;
  usernameExists = false;
  updateSuccess = false;
  isEditMode = false;
  verificationMethod: 'PHONE' | 'EMAIL' | null = null;
  otpInputs: string[] = ['', '', '', '', '', ''];
  showOtpInputModal = false;
  otpErrorMessage='';
  timer:any;
  otpExpiredMessage = '';
  timeLeft = 0;
  otpExpired = false;
  currentUserId: number;
  user: User;
  

  constructor(private fb: FormBuilder, private userService: UserdetailsService,private router:Router,private service: AuthService) {}
 

  goBack(): void {
  this.router.navigate(['/home']);
  }


  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.currentUserId = +id;
    }

    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.loadUserProfile();
  }

  get f() {
    return this.profileForm.controls;
  }

  loadUserProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.currentUserId = userId;

    this.userService.getUserById(userId).subscribe(user => {
      this.user = user;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber
      });
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid || this.usernameExists) return;
  
    const updatedEmail = this.profileForm.value.email;
    const updatedMobile = this.profileForm.value.mobileNumber;
  
    const emailChanged = updatedEmail !== this.user.email;
    const mobileChanged = updatedMobile !== this.user.mobileNumber;
  
    if (emailChanged) {
      this.verificationMethod = 'EMAIL';
      this.sendOtp(updatedEmail);
      return;
    }
  
    if (mobileChanged) {
      this.verificationMethod = 'PHONE';
      this.sendOtp(updatedMobile);
      return;
    }
  
    // If no verification needed, proceed to update
    this.finalizeUpdate();
  }

  enableEdit(): void {
    this.isEditMode = true;
    this.updateSuccess = false;

    this.profileForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      mobileNumber: this.user.mobileNumber
    });

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.updateSuccess = false;
    this.usernameExists = false;

    this.profileForm.patchValue({
      username: this.user.username,
      email: this.user.email,
      mobileNumber: this.user.mobileNumber
    });

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }
  finalizeUpdate(): void {
    const updatedUser: User = {
      userId: this.currentUserId,
      username: this.profileForm.value.username,
      email: this.profileForm.value.email,
      mobileNumber: this.profileForm.value.mobileNumber,
      userRole: this.user.userRole,
      approved: true
    };
  
    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.user = updatedUser;
        this.updateSuccess = true;
        this.isEditMode = false;
      },
      error: err => {
        console.error('Update failed:', err);
      }
    });
  }
  verifyOtp(): void {
    const key = this.verificationMethod === 'EMAIL'
      ? this.profileForm.value.email
      : this.profileForm.value.mobileNumber;
  
    const otp = this.otpInputs.join('');
  
    this.service.verifyOtp(key, otp, this.verificationMethod).subscribe(response => {
      if (response === 'OTP Verified Successfully') {
        
        clearInterval(this.timer);
        this.showOtpInputModal = false;
        this.otpInputs = ['', '', '', '', '', ''];
  
        this.finalizeUpdate(); // ✅ Proceed to update after verification
      } else {
        this.otpErrorMessage = 'Invalid OTP. Please try again.';
        this.resetOtpInputs();
      }
    });
  }
  sendOtp(key: string): void {
    this.service.sendOtp(key, this.verificationMethod).subscribe(() => {
      this.showOtpInputModal = true;
      this.startOtpTimer();
    });

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
  

  
  

  
  


}






