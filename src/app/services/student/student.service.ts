

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class StudentService {

  API_URL: String;
  token: any;

  constructor(
    private http: HttpClient,
  ) { this.API_URL = environment.API_URL; }

  public get(url: string, options?: any) {
    return this.http.get(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }

  getAllStudents() {
    return this.get(this.API_URL + 'user/get-all-users');
  }

  doRegisterStudent(data, userId) {
    let returnData;
    console.log('userId', userId);
    if (userId != null) {
      returnData = this.put(this.API_URL + 'user/' + userId, data)
    } else {
      returnData = this.post(this.API_URL + 'user/', data)
    }
    return returnData;
  }

  deleteStudent(userId: string) {
    return this.delete(this.API_URL + 'user/' + userId)
  }

  getStudentDetails(userId) {
    return this.get(this.API_URL + 'user/get-user/' + userId);
  }

  getAllUsers() {
    return this.get(this.API_URL + 'user/get-all-users/');
  }

}

