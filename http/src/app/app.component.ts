import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { logging } from 'selenium-webdriver';
import { User } from './user';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^zime/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  // name$: Observable<string>;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = fb.group(
      {
        'userName': ['', Validators.compose([Validators.required,
          userNameValidator, Validators.minLength(7)])],
        'password': ['', Validators.compose([Validators.required,
        Validators.minLength(6)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    // this.name$ = this.userName.valueChanges;
    // this.userName.valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'users')
  }
  login() {
    if (this.myForm.invalid) {
      return;
    }
    this.httpClient.put(this.baseUrl + 'user', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert("成功登录");
          window.location.href = "http://www.baidu.com"
        }
        else {
          alert("账号或密码错误")
        }
      }
    )
  }
  onSubmit(value: any) {
    console.log(value);
  }
}

