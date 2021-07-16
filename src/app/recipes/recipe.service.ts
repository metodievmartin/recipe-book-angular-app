import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[]; /*= [
        new Recipe(
            'Tasty Schnitzel',
            'A super tasty schnitzel - just awesome',
            'https://www.curiouscuisiniere.com/wp-content/uploads/2060/09/German-Pork-Schnitzel-9121-1200-720x405.jpg',
            [new Ingredient('Meat', 1), new Ingredient('Chips', 20)]
        ),
        new Recipe(
            'Big Fat Burger',
            'What else do you need?',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
            [new Ingredient('Meat', 1), new Ingredient('Buns', 2)]
        )
    ];*/

    constructor(private slService: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe): void {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
