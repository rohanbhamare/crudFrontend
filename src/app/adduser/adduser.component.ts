import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpService } from '../http.service';
import { Router } from '@angular/router';

import { User } from '../models/user.model';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  formGroup: FormGroup;
  data = new User();

  constructor(private formBuilder: FormBuilder, private router:Router, private httpService:HttpService) {
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if (this.formGroup.valid) {
      let data = this.formGroup.value;
      this.httpService.addUser(data).subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}

}
