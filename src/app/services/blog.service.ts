import { Injectable } from '@angular/core';
import { BlogInterface, IUser } from '../interface/blog-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

private posts: Array<BlogInterface>=[
  {
  id:1,
  postedBy:'admin',
  topic: "First post",
  date: new Date().toLocaleString(),
  message:'any text bla bla bla'
}]

private users: Array<IUser>=[{
  id:1,
  username:'admin',
  email:'admin@gmail.com',
  password:'admin111'
}]


constructor() { }

getPosts(): Array<BlogInterface>{
  return this.posts
}

getUsers(): Array<IUser>{
  return this.users
}

addPost(post:BlogInterface): void{
  this.posts.push(post)
}

deletePost(index:number){
  this.posts.splice(index, 1);
}

addUser(user:IUser): void{
  this.users.push(user)
}

editPost(index:number,post:BlogInterface){
  this.posts[index]=post
}

getPost(index:number):BlogInterface{
  return this.posts[index]
}

}
