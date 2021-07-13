import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', { static: false }) slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService) {
    }

    ngOnInit(): void {
        this.subscription = this.slService.startedEditing
            .subscribe((index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
                this.editedItem = this.slService.getIngredient(index);
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                });
            });
    }

    onSubmit(form: NgForm) {
        const value = form.value

        const ingredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.slService.updateIngredient(this.editedItemIndex, ingredient);
        } else {
            this.slService.addIngredient(ingredient);
        }

        this.editMode = false;
        form.reset();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
    }

    onDelete() {
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
}
