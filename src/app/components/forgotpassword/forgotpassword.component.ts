import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(private _ForgotpassService:ForgotpassService ,private _Router:Router){}

  step1 : boolean = true ;
  step2 : boolean = false ;
  step3 : boolean = false ;
  email : string = '' ;
  responseMsg : string ='' ;

  forgetForm :FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email])
  })
  resetCodeForm :FormGroup = new FormGroup({
    resetCode : new FormControl('')
  })
  resetPasswordForm :FormGroup = new FormGroup({
    // email : this.forgetForm.get('email')?.value,
    newPassword : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)])
  })


  forgotPassword():void {
    let userEmail = this.forgetForm.value
    this.email = userEmail.email
     this._ForgotpassService.forgetpassword(userEmail).subscribe({
      next:(res)=>{
        console.log(res);
        this.responseMsg=res.message;
        this.step1 =false;
        this.step2 =true;
        // this.iinfo = '';
      },
      error : (err)=>{
      this.responseMsg = err.error.message ;
      }
    })

  }

  resetCode():void {
    let resetcod =this.resetCodeForm.value
    this._ForgotpassService.resetcode(resetcod).subscribe({
    next : (response)=>{
      console.log(response);

      this.step2 = false ;
      this.step3 = true ;
      this.responseMsg='' ;
    },
    error : (err)=>{
      this.responseMsg=err.error.message;
    }
    })

  }

  newPassword():void {

    let resetPassword =this.resetPasswordForm.value
    resetPassword.email = this.email ;
    this._ForgotpassService.restPasword(resetPassword).subscribe({
    next : (respone)=> {
      if(respone.token){
        localStorage.setItem('etoken',respone.token);
        this._Router.navigate(['/home']);
      }

    },
    error : (err)=>{
      this.responseMsg = err.error.message ;
    }
    })
  }

  // Show Password
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }



}
