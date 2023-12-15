import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  SERVER_URL = "https://employee-portal-kdpd.onrender.com"
  constructor( private http:HttpClient) { }

  // add user api
  addUserAPI(user:UserModel){
    return this.http.post(`${this.SERVER_URL}/users`,user)
  }

  // get all user
  getAllUserApi(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }

  // delete user
deleteUserApi(id:string){
  return this.http.delete(`${this.SERVER_URL}/users/${id}`)

}

// view user
viewUserAPI(id:any){
  return this.http.get(`${this.SERVER_URL}/users/${id}`)
}
// edit user api
UpdateUserAPI(id:any,user:UserModel){
  return this.http.put(`${this.SERVER_URL}/users/${id}`,user)
}
}
