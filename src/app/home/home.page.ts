import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';
import { Platform } from '@ionic/angular';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
 
  posts: Post[];
 
  
  constructor(public plt: Platform, private lottieSplashScreen: LottieSplashScreen,private postService: PostService){
   
  
    }
 
  ngOnInit() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }
 
  remove(item) {
    this.postService.removePost(item.id);
  }
}

