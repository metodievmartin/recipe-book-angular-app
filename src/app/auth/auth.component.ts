import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private storeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromApp.IAppState>
    ) {
    }

    ngOnInit() {
        this.storeSub = this.store.select(state => state.auth).subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const { email, password } = form.value;

        this.isLoading = true;

        if (this.isLoginMode) {
            this.store.dispatch(new AuthActions.LoginStart({ email, password }))
        } else {
            this.store.dispatch(new AuthActions.SignUpStart({ email, password }))
        }

        form.reset();
    }

    onCloseModal() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy() {
        if (this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}
