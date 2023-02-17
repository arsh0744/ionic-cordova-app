import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/User';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http : HttpClient) { }



url_addNewUSer ="http://localhost:9800/addUser"
addNewUser(newUser:User):Observable<any>{
  return this.http.post(this.url_addNewUSer,newUser)
}

url_allUsers ="http://localhost:9800/users"
getAllUsers():Observable<any>{
  return this.http.get(this.url_allUsers)
}

}
