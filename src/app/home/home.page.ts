import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../services/post.service';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
 
  posts: Post[];
 
  constructor(private postService: PostService) { }
 
  ngOnInit() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }
 
  remove(item) {
    this.postService.removePost(item.id);
  }
}

