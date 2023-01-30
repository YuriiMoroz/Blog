import { BuiltinTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BlogInterface, IUser } from '../interface/blog-interface';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

 
  public in = false
  public up = false
  public signin=true
  public addPost = false
  public name = 'admin'
  public editPost = false
  public isIdentity = true


  public index!:number

  public regName!:string
  public regEmail!:string
  public regPassword!:string
  
  public EmailIn!:string;
  public passwordIn!:string;
  public postName!:string;
  public postText!:string;

  private usersArr=['']
  private passwords=['']
  private emails=['']
  
  public posts!: BlogInterface[]
  public users!: IUser[]

  constructor(
    private blogService: BlogService
  ) {  }
  
  ngOnInit(): void {
    this.usersArr.pop()
    this.passwords.pop()
    this.emails.pop()
    this.GetArr();
    this.getData();
  }

  GetArr(): void{
    this.posts = this.blogService.getPosts()
    this.users = this.blogService.getUsers()
  }

  getData():void{
    for (let i = 0; i < this.users.length; i++) {
      this.usersArr.push(this.users[i].username);
      this.passwords.push(this.users[i].password);
      this.emails.push(this.users[i].email)
    }
  }

  SignIn(): void{
    this.in = true;
  }

  SignUp(): void{
    this.up = true
    
  }

  CloseIn():void{
    this.in = false;
    this.up = false;
    this.addPost = false
  }

  SubmitSignIn(){
    console.log(this.usersArr)
    for (let i = 0; i < this.emails.length; i++) {
      if (this.emails[i]==this.EmailIn&&
        this.passwords[i]==this.passwordIn) {
        this.signin=true
        this.CloseIn()
        this.name=this.usersArr[i]
      }
    }
    this.Reset()
  }

  SignOut(){
    this.signin=false;
    this.name=''
  }


  Post(){
    if(this.postText){
      const newPost={
        id:1,
        postedBy:this.name,
        topic: this.postName,
        date: new Date().toLocaleString(),
        message: this.postText,
      }
      if(this.posts.length > 0) {
        const id = this.posts.slice(-1)[0].id;
        newPost.id = id + 1;
      }
      this.blogService.addPost(newPost)
      this.CloseIn()
    }
    this.Reset()
  }

  EditPost(i:number): void{
    this.addPost=true;
    this.postName = this.posts[i].topic
    this.postText = this.posts[i].message
    this.editPost = true;
    this.index=i;
  }

  DeletePost(i:number): void{
    this.blogService.deletePost(i);
  }

  Registration():void{
    this.ChekIndentity(this.regName,this.regEmail)
    if(this.regEmail&&this.regName&&this.regPassword&&this.isIdentity){
      const newUser={
        id:1,
        username:this.regName,
        email:this.regEmail,
        password:this.regPassword
      }
      if(this.posts.length > 0) {
        const id = this.posts.slice(-1)[0].id;
        newUser.id = id + 1;
      }
      this.signin=true
      this.CloseIn()
      this.name=this.regName
      this.blogService.addUser(newUser)
      this.CloseIn()
      this.getData()
    }else{
      alert('change your registration data')
    }
  }

  AddPost(){
    this.addPost=true;
    this.editPost = false
  }

  Reset(){
    this.regName='';
    this.regEmail='';
    this.regPassword='';
    this.EmailIn='';
    this.passwordIn ='';
    this.postName='';
    this.postText='';
  }

  Edit(){
    let temp = this.blogService.getPost(this.index);
    temp.message = this.postText
    temp.topic = this.postName
    this.blogService.editPost(this.index, temp);
    this.CloseIn()
    this.Reset() 
  }


  ChekIndentity(name:string,mail:string){
    for (let i = 0; i < this.usersArr.length; i++) {
      if (name==this.usersArr[i]||mail==this.emails[i]) {
        this.isIdentity = false;
      }
    }
  }

}
