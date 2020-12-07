import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user-data';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://localhost:3000/users";
  private mockUrl = 'api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private httpClient:HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any):Observable<T> => {
      console.error(error);
      console.log(`${operation} failed ${error.message}`)
      return of(result as T)
    }
  }

  getUsersList(){
    //return this.httpClient.get(this.baseUrl);
    return this.httpClient.get<User[]>(this.mockUrl)
    .pipe(
      tap(_ => console.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    )
  }

  getUser(id){
    //return this.httpClient.get(this.baseUrl+"/"+id);
    const url = `${this.mockUrl}/${id}`;
    return this.httpClient.get<User>(url)
    .pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    )
  }

  addUser(data:User): Observable<User> {
    //return this.httpClient.post(this.baseUrl, data)
    return this.httpClient.post<User>(this.mockUrl, data, this.httpOptions).pipe(
      tap((newUser:User) => console.log(`added user id=${newUser.name}`)),
      catchError(this.handleError<User>('AddUser'))
    )
  }

  updateUser(id,data){
    //return this.httpClient.put(this.baseUrl+"/"+id,data);
    const url = `${this.mockUrl}/${id}`;
    return this.httpClient.put<User>(url, data, this.httpOptions).pipe(
      tap(_ => console.log(`updated User id=${id}`)),
      catchError(this.handleError<User>('updateUser'))
    )
  }

  deleteUser(id): Observable<User>{
    //return this.httpClient.delete(this.baseUrl+"/"+id);
    const url = `${this.mockUrl}/${id}`
    return this.httpClient.delete<User>(url,this.httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    )
  }
}
