import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface IState {
    user: User;
}

const initialState = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions.Type) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const newUser = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );

            return {
                ...state,
                user: newUser
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
