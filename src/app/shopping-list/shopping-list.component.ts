import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private ingredientsChangeSubs: Subscription;

    constructor(
        private slService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) {
    }

    ngOnInit(): void {
        this.ingredients = this.store.select('shoppingList');
        // this.ingredients = this.slService.getIngredients();
        // this.ingredientsChangeSubs = this.slService.ingredientChanged
        //     .subscribe((ingredients: Ingredient[]) => {
        //         this.ingredients = ingredients;
        //     });
    }

    ngOnDestroy() {
        // this.ingredientsChangeSubs.unsubscribe();
    }

    onEditItem(index: number) {
        this.slService.startedEditing.next(index);
    }
}
