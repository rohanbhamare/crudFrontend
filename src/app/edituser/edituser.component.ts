import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { User } from '../models/user.model'


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  formGroup: FormGroup;

  userId:string;
  user = new User();

  constructor(private formBuilder: FormBuilder,private httpService:HttpService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.userId = params.id;

      this.getUser();
    })
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.formBuilder.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    });
  }

  getUser(){
    this.httpService.getUser(this.userId).subscribe((data)=>{
      this.user = data as User
      this.formGroup.patchValue({
        id:this.user.id,
        name:this.user.name,
        phone:this.user.phone,
        email:this.user.email
      })
    });
  }

  onSubmit(){
    if (this.formGroup.valid) {
      let data = this.formGroup.value;
      this.httpService.updateUser(this.userId,data).subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}

}
