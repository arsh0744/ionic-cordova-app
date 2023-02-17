import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/User';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.page.html',
  styleUrls: ['./allusers.page.scss'],
})
export class AllusersPage implements OnInit {

  allUsers : User[]

  constructor(private userservice : ApiserviceService) { }

  ngOnInit() {

    this.userservice.getAllUsers().subscribe(e=>{
      this.allUsers=e
      console.log(this.allUsers)
    })

  }

}
