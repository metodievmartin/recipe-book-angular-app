import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(new RecipesAction.FetchRecipes());
        return this.actions$.pipe(
            ofType(RecipesAction.SET_RECIPES),
            take(1)
        );
    }
}
