import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../entity/User';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor() { }

  private adminLog = new BehaviorSubject<boolean>(false);
  admin = this.adminLog.asObservable();
  private registeredUsers = new BehaviorSubject<Array<User>>(null)
  users = this.registeredUsers.asObservable();

  //registeredUsers = new Array<User>


  adminSwitch(trial){
    this.adminLog.next(trial);
  }

  addUser(newuser:User){
    
  }


}
