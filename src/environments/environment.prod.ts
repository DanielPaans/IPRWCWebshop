const API_PATH = "http://localhost:8080/api";
const IMAGE_PATH = "http://localhost/save.php";
export const environment = {
  production: true,
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
