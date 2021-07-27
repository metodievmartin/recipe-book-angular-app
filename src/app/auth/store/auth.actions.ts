import { Action } from '@ngrx/store';

export const SIGNUP_START = '[Auth] Signup Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTO_LOGIN = '[Auth] Autologin';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class SignUpStart implements Action {
    readonly type = SIGNUP_START;

    constructor(
        public payload: { email: string; password: string }
    ) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(
        public payload: { email: string; password: string }
    ) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(
        public payload: {
            email: string;
            userId: string
            token: string,
            expirationDate: Date
        }
    ) {
    }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {
    }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type Type =
    | AuthenticateSuccess
    | Logout
    | AuthenticateFail
    | LoginStart
    | SignUpStart
    | ClearError
    | AutoLogin;
