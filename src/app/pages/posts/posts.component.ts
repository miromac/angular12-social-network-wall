import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(public userService:UserService,
    private router:Router,
    private storage:AngularFireStorage,
    public postService:PostService) { }

  ngOnInit(): void {
    if (this.userService.user == undefined || this.userService.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userService.user = JSON.parse(str);
      }
      else {
        this.router.navigate(['/login']);
      }
    }

    this.postService.getPosts().then((res:any)=>{
      this.posts = res;
      for(let post of this.posts){
        this.commentText.push("");
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  selectedFile:any;
  text = "";
  posts:Array<any> = [];
  commentText:Array<string> = [];

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  post(){
    if(this.selectedFile != undefined || this.selectedFile != null){
      this.uploadImage().then((imageURL)=>{
        console.log(imageURL);
        let postObj = {
          username: this.userService.user.username,
          text : this.text,
          imageURL: imageURL,
          likes: [],
          comments:[]
        };
        this.posts.push(postObj);
        this.postService.saveNewPost(postObj).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        });
      }).catch((err)=>{
        console.log(err);
      });
    }
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          let imageURL = fileRef.getDownloadURL();
          imageURL.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url);
            }
          });
        })
      ).subscribe(
        (url)=>{
          if(url){
            console.log(url);
          }
        }
      );
    });
  }

  postSchema = {
    username :'',
    imageURL:'',
    text:'',
    likes:[],
    comments:[{username:'', comment:''}]
  }

}
