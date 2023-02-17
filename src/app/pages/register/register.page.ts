import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from "src/app/entity/User";
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  //Declarations--------------------------------------------------------------


  private formBuilder : FormBuilder;
  RegisterForm :  FormGroup;
  registeredUsers = new Array<User>
  newUser = new User()


   //Declarations--------------------------------------------------------------


  constructor(formbBuilder : FormBuilder,private loadingCtrl: LoadingController,
          private registerPageApiService : ApiserviceService , private router:Router
          ,private alertController: AlertController
    ) {

    this.formBuilder = formbBuilder
    

   }

  ngOnInit() {
    this.RegisterForm= this.createSignupForm();
  }


  createSignupForm(): FormGroup{

    return this.formBuilder.group({
      regisMail:['',[Validators.required,Validators.email]],
      regisNum:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      regisPass : ['', Validators.required],
      regisPassRep :['', Validators.required]
    })
  }

  register(){

    
    

    // Change this to Validation Module
    
   
    // this.showLoading();

    //wrap this in a promise
    if(this.RegisterForm.value.regisPass == this.RegisterForm.value.regisPassRep){
      this.newUser.mail = this.RegisterForm.value.regisMail;
      this.newUser.password = this.RegisterForm.value.regisPass ;
      this.newUser.phonenum = this.RegisterForm.value.regisNum;

      
     this.registerPageApiService.addNewUser(this.newUser).subscribe(e=>{
        console.log(e)
        this.showLoading()
        if(e!=null){
         setTimeout(() => {
          this.router.navigate(['home'])
         }, 3500);
         
        }
        else 
        this.presentAlert();
      })

      

      // wrap this in a promise


    }


    



  }



  // Create Re Usable Loading Interface
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Registering New User ...',
      duration: 3000,
      cssClass: 'custom-loading',
      spinner:'crescent'
    });

    loading.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sign-In Error',

      message: 'Invalid Login or Password',
      buttons: ['OK'],
    });

    await alert.present();

    //Timed alert Dismiss
    /*setTimeout(async () => {
      await alert.dismiss();
    }, 5000);
*/

}

}
