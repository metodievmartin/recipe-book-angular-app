import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const RECIPES_URL: string = 'https://recipe-book-e0fb0-default-rtdb.firebaseio.com/recipes.json';

@Injectable()
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService
    ) {
    }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();

        this.http.put(RECIPES_URL, recipes)
            .subscribe(res => console.log(res));
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(RECIPES_URL)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes)
                })
            );
    }
}
