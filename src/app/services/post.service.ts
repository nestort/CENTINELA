import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface Post {
  id?: string;
  idUser : string; 
  description: string;
  location: string;
  createdAt: number;
  Lat: string;
  Lon: string;
}
 
@Injectable({
  providedIn: 'root'
})

export class PostService {

  private postsCollection: AngularFirestoreCollection<Post>;
 
  private posts: Observable<Post[]>;
 
  constructor(db: AngularFirestore) {
    this.postsCollection = db.collection<Post>('posts');
 
    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
   getPosts() {
    return  this.posts;
  }
 
  getPost(id) {
    return this.postsCollection.doc<Post>(id).valueChanges();
  }
 
  updatePost(post: Post, id: string) {
    return this.postsCollection.doc(id).update(post);
  }
 
  addPost(post: Post) {
    return this.postsCollection.add(post);
  }
 
  removePost(id) {
    return this.postsCollection.doc(id).delete();
  }
}
