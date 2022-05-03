import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: User;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.authService.currentUser$().subscribe({
      next: data=>{
        this.user = data.data;
      },
      error: err=>{
        console.log(err);
      }
    });
  }

}
