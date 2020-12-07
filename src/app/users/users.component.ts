import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';
import { User } from '../models/user.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'phone', 'email', 'action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource: User[];

  constructor(private httpService:HttpService, private route:Router) {
    this.getUsersList();
   }

  ngOnInit(): void {
  }

  getUsersList(){
    return this.httpService.getUsersList().subscribe((res)=>{
      this.dataSource = res as User[];
    })
  }

  deleteUser(id){
    return this.httpService.deleteUser(id).subscribe(()=>{
      console.log(">>>>>>>>>>. user deleted...");
      this.getUsersList();
    })
  }

  editUser(id){
    this.route.navigate([`/edituser/${id}`]);
  }

}
