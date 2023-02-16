import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { async } from 'rxjs';
import { User } from "src/app/entity/User";

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


  constructor(formbBuilder : FormBuilder,private loadingCtrl: LoadingController) {

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

    console.log("register")
    

    // Change this to Validation Module
    console.log(typeof(this.registeredUsers))
    console.log(typeof(this.newUser))
   
    // this.showLoading();

    //wrap this in a promise
    if(this.RegisterForm.value.regisPass == this.RegisterForm.value.regisPassRep){
      this.newUser.email = this.RegisterForm.value.regisMail;
      this.newUser.password = this.RegisterForm.value.regisPass ;
      this.newUser.phone = this.RegisterForm.value.regisNum;

      console.log(this.newUser)
      this.registeredUsers.push(this.newUser)
      console.log(this.registeredUsers)

      this.registeredUsers.forEach(e=>{
        console.log(e)
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

}
