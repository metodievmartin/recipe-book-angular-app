import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipesChangedSubscription: Subscription;
    recipes: Recipe[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.recipesChangedSubscription = this.store.select(state => state.recipes)
            .pipe(
                map(recipeState => recipeState.recipes)
            )
            .subscribe((recipes: Recipe[]) => {
                this.recipes = recipes;
            });
    }

    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

    ngOnDestroy() {
        //this.recipesChangedSubscription.unsubscribe();
    }
}
