// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiKey: 'AIzaSyBg_PZ14K5toJkmcgMmbO5ck8QKsrQUvq8',
    signInEndpoint: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
    logInEndpoint: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    recipesEndpoint: 'https://recipe-book-e0fb0-default-rtdb.firebaseio.com/recipes.json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
