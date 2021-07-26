import { Action } from '@ngrx/store';

export const LOGIN = '[Shopping List] Login';
export const LOGOUT = '[Shopping List] Logout';

export class Login implements Action {
    readonly type = LOGIN;

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

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type Type = Login | Logout;
