import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
    recipe: Recipe;
    id: number

    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.id = Number(params['id']);
                this.recipe = this.recipeService.getRecipeById(this.id);
            });
    }

    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
}
