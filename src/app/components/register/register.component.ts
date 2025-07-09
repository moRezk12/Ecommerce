import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router ,private  _FormBuilder:FormBuilder){}

  errMsg : string=''
  spinner : boolean = false;

  // registerForm:FormGroup = this._FormBuilder.group({
  //   name:['' ,[Validators.required,Validators.minLength(3),Validators.maxLength(20)] ],
  //   email:["",[Validators.required,Validators.email]],
  //   password:["",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]],
  //   rePassword:[''],
  //   phone:['' , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]

  // } ,{Validators : [this.confirmPassword] } as FormControlOptions )

  // طريقة اخرى

  registerForm:FormGroup = new FormGroup({
    name:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]),
    rePassword:new FormControl(""),
    phone:new FormControl("",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } ,{Validators : [this.confirmPassword] } as FormControlOptions)

  confirmPassword(group:FormGroup):void{

    const password = group.get("password");
    const rePassword = group.get("rePassword");
    if( rePassword?.value == " " ){
      rePassword?.setErrors({required : true })
    }
    else if(password?.value != rePassword?.value ){
      rePassword?.setErrors({mismatch : true })
    }
  }

  handleForm():void {

    const userData : object = this.registerForm.value;
    this.spinner =true;
    if(this.registerForm.valid === true){
      this._AuthService.register(userData).subscribe({
      next: (Response)=>{
      if(Response.message=='success'){
        this._Router.navigate(['/login']);
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

  //

  showPassword = false;
showRePassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

toggleRePassword() {
  this.showRePassword = !this.showRePassword;
}



}
