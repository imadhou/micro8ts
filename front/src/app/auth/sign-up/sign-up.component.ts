import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AuthService]
})
export class SignUpComponent implements OnInit {

  formGroup!: FormGroup;
  user: User = new User();
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.formGroup = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }


  public saveUser(){
    this.authService.signUp$(this.user).subscribe({
      next: data=>{
        this.authService.setLocalStorageToken({key: "jwt", value:data.data});
        this.router.navigate([""]);
        
      },
      error: err=>{
        console.log(err);
      }
    });
  }

}
