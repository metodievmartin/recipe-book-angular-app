import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSubscription: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit() {
        this.userSubscription = this.store.select('auth')
            .pipe(
                map(authState => authState.user)
            )
            .subscribe(user => {
               this.isAuthenticated = !!user;
            });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
}
