import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,

}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_KEY = 'AIzaSyBg_PZ14K5toJkmcgMmbO5ck8QKsrQUvq8';
    private AUTH_API = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

    constructor(
        private http: HttpClient) {
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.AUTH_API, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(errResponse => {
                let errorMessage = 'An unknown message occurred!';
                if (!errResponse.error || !errResponse.error.error) {
                    return throwError(errorMessage);
                }
                switch (errResponse.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists';
                }
                return throwError(errorMessage);
            })
        );
    }
}
