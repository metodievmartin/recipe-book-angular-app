import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
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
    ];

    constructor(private slService: ShoppingListService) {
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number): Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}
