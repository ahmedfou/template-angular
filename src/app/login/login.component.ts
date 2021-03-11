import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition} from '../router.animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(public router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        console.log(this.password.value);
        console.log(this.username.value);
        this.authenticationService.login(this.username.value, this.password.value)
            .subscribe(data => {
                this.router.navigate(['/dashboard']);
            }, error1 => {
                console.log(error1);
            });
    }
}
