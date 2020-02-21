import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Connection with the backend
const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  addPost(body): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/post/add-post`, body);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${BASEURL}/posts`);
  }

  addLike(body): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-like`, body);
  }

  addComment(postId, comment): Observable<any> {
    return this.http.post(`${BASEURL}/post/add-comment`, { postId, comment });
  }

  getPost(id): Observable<any> {
    return this.http.get(`${BASEURL}/post/${id}`);
  }

  addRequest(userRequested, postId): Observable<any> {
    return this.http.post(`${BASEURL}/add-request`, { userRequested, postId });
  }

  cancelRequest(userRequested, postId): Observable<any> {
    return this.http.post(`${BASEURL}/cancel-request`, { userRequested, postId });
  }

  cancelApplication(userRequested, username, postId): Observable<any> {
    return this.http.post(`${BASEURL}/cancel-application`, { userRequested, username, postId });
  }

  cleanWebsite(userRequested, username, postId): Observable<any> {
    return this.http.post(`${BASEURL}/clean-website`, { userRequested, username, postId });
  }

  addTask(userDoingTask, userDoingTaskUsername, postId): Observable<any> {
    return this.http.post(`${BASEURL}/add-task`, { userDoingTask, userDoingTaskUsername, postId });
  }

  MarkTask(id, userDoingTask): Observable<any> {
    return this.http.post(`${BASEURL}/mark-task/${id}`, {
      id,
      userDoingTask
    });
  }
}
