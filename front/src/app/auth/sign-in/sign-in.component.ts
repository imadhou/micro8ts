import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  initForm(){
    this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
  }
  login(){
    this.authService.signUp$(this.user).subscribe({
      next: data=>{
        this.authService.setLocalStorageToken({key:"jwt", value: data.data});
        this.router.navigate([""]);
      },
      error: err=>{
        console.log(err);
      }
    });
  }
}
