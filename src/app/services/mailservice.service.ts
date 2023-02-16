import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailserviceService {

  private url =""


  constructor(private http: HttpClient) { }

  SendMail(input:any){
    return this.http.post(this.url,input).pipe(

      map(
    
        (res)=>{
          if (res)
            return res
            else
            return null
        },
        (error)=>{
          if(error)
          return error
        }
        
      )
    )
  }


}
