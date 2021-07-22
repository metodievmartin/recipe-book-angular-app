import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';

@NgModule({
    providers: [
        RecipeService,
        DataStorageService,
        RecipesResolverService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule {

}
