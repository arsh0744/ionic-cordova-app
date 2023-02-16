import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { openStdin } from 'process';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {


  private formBuilder : FormBuilder;
  getOTPForm : FormGroup
  submitOTPForm: FormGroup
  private otp : number
  constructor(formBuilder :FormBuilder,private loadingCtrl: LoadingController) {

    this.formBuilder = formBuilder

  }

  ngOnInit() {

    this.getOTPForm = this.createOTPForm()
    this.submitOTPForm = this.createsubmitOTPForm()

  }


  createOTPForm() : FormGroup{
    return this.formBuilder.group({
      regisMail : ['',[Validators.required,Validators.email]]
    })
  }

  createsubmitOTPForm(): FormGroup{
    return this.formBuilder.group({
      otpnum:['32423',Validators.required]
    })
  }

  getOTP(){

    //Generate OTP

    this.otp= Math.trunc((Math.random()*1000000))
    this.showLoading();



  }
  submitOTP(){
    //submit OTP
  }

  showOTPForm(){



  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Sending OTP ...',
      duration: 3000,
      cssClass: 'custom-loading',
      spinner:'crescent'
    });

    loading.present();
  }

}
