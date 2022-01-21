// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_PATH = "http://localhost:8443/api";
const IMAGE_PATH = "http://localhost/save.php";
export const environment = {
  production: false,
  HTTP_CONFIG: {
    API_PATH: API_PATH,
    ADMIN_PATH: API_PATH + "/admin",
    AUTH_PATH: API_PATH + "/authenticate",
    USER_PATH: API_PATH + "/user",
    PRODUCT_PATH: API_PATH + "/product",
    ORDER_PATH: API_PATH + "/order",
    CATEGORY_PATH: API_PATH + "/category",
    IMAGE_PATH: IMAGE_PATH
  },
  PATH: "./assets/images/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
