import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
  //public user:User = new User();

  user={
    email:"",
    password:""
  } 

  constructor(public plt: Platform,public fAuth: AngularFireAuth,private router: Router,private lottieSplashScreen: LottieSplashScreen) { 

   
    this.lottieSplashScreen.show('https://assets10.lottiefiles.com/packages/lf20_CLhLRL/data.json', false, 1024, 768);
      

  }

  ngOnInit() {
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully logged in!");
        this.router.navigate(['/home'])
      }

    } catch (err) {
      console.error(err);
    }
  }


}
