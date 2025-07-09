import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router ,private  _FormBuilder:FormBuilder){}

  errMsg : string=''
  spinner : boolean = false;

  // loginForm:FormGroup = this._FormBuilder.group({

  //   email:["",[Validators.required,Validators.email]],
  //   password:["",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]],

  // } )

  // طريقة اخرى

  loginForm:FormGroup = new FormGroup({

    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]),

  })



  handleForm():void {

    const userData : object = this.loginForm.value;
    this.spinner =true;
    if(this.loginForm.valid === true){
      this._AuthService.login(userData).subscribe({
      next: (Response)=>{
      if(Response.message=='success'){
        localStorage.setItem('etoken' , Response.token );
        this._AuthService.decodeUser();
        this._Router.navigate(['/home']);
        this.spinner =false;
      }
      },
      error:(err)=>{
        this.errMsg= err.error.message;
        this.spinner =false;
      }
      })
    }

  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
