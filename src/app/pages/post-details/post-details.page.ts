import { Post, PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
 
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
 
  post: Post = {
  	idUser : '100',
  	description: 'assault with 21 guns',
  	location: 'lomas 4ta section #123456 cp 098765',
    clasification: 0,
    status: 0,
  	createdAt: new Date().getTime(),    
    Lon: '-101.025054',
    Lat: '22.148077'
  };
 
  postId = null;
 
  constructor(private route: ActivatedRoute, private nav: NavController, private postService: PostService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    if (this.postId)  {
      this.loadPost();
    }
  }
 
  async loadPost() {
    const loading = await this.loadingController.create({
      message: 'Loading Complaint..'
    });
    await loading.present();
 
    this.postService.getPost(this.postId).subscribe(res => {
      loading.dismiss();
      this.post = res;
    });
  }
 
  async savePost() {
 
    const loading = await this.loadingController.create({
      message: 'Saving Complaint..'
    });

    await loading.present();
 
    if (this.postId) {
      this.postService.updatePost(this.post, this.postId).then(() => {
        loading.dismiss();
        //this.nav.goBack('home');
      });
    } else {
      this.postService.addPost(this.post).then(() => {
        loading.dismiss();
        //this.nav.goBack('home');
      });
    }
  }
 
}