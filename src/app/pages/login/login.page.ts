import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    //Declarations--------------------------------------------------------------


    private formBuilder : FormBuilder;
    LoginForm :  FormGroup;
    adminForm : FormGroup ;
    adminLoginForm :boolean


     //Declarations--------------------------------------------------------------




  constructor(formbBuilder : FormBuilder, private router:Router,private loadingCtrl: LoadingController,
    private alertController: AlertController, private loginPageService : DataserviceService

    ) {

      this.formBuilder = formbBuilder
      

  }

  ngOnInit() {

        this.LoginForm = this.createLoginForm()
        this.adminForm = this.createAdminLoginForm()


        this.loginPageService.admin.subscribe(e=>{
          this.adminLoginForm=e;
        })

  }

  createLoginForm(): FormGroup{

    return this.formBuilder.group({
      login:['',[Validators.required,Validators.email]],
      password : ['', Validators.required]
    })
  }

  createAdminLoginForm(): FormGroup{

    return this.formBuilder.group({
      adminLogin:['arsh',[Validators.required]],
      adminPassword : ['arsh', Validators.required]
    })
  }

  login(){

    this.showLoading();
    if(this.LoginForm.value.login=='arsh@gmail.com' && this.LoginForm.value.password=='arsh'){


     setTimeout(() => {
      this.router.navigate(['home'])
     }, 3500);

    }
    else
    setTimeout(() => {
      this.presentAlert() ;
     }, 3500);


  }

  adminLogin(){

   
    
    //---------Optimize and change to Promise----------------------------//
    
   // this.showLoading();
    if(this.adminForm.value.adminLogin=="arsh" && this.adminForm.value.adminPassword=="arsh"){
      console.log('admin Logged')
      this.showLoading();
      setTimeout(() => {
        this.router.navigate(['admin-dash'])
      }, 3500);
    }
    else{
      this.presentAlert().then(()=>{
        console.log("Not Admin")
      });
    }
   

  }

  registerPageLoad(){
    this.router.navigate(['register'])
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Signing In ...',
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

resetPass(){

this.router.navigate(['resetpass'])


}

LoginChanger(e:boolean){
  
  this.loginPageService.adminSwitch(e)

  
 // console.log(document.getElementById('l1'))
  //console.log(document.getElementById('l2'))

  
}
}