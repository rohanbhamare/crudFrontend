import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const users: User[] = [
      { id:1, name: 'Rohan Bhamare', phone:9892319686, email:'rohancool@gmail.com' },
      { id:2, name: 'Vian ferrao', phone:9892319686, email:'viancool@gmail.com' },
      { id:3, name: 'Amol Pandit', phone:9892319686, email:'amolcool@gmail.com' },
      { id:4, name: 'Paresh ferrao', phone:9892319686, email:'pareshcool@gmail.com' },
    ];
    
    return {users};
  }

  
  constructor() { }
}
