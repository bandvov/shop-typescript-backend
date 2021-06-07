export const REGISTER_ROUTE = '/register';
export const LOGIN_ROUTE = '/login';
export const UPDATE_USER_ROUTE = '/user/:id';
export const DELETE_USER_ROUTE = '/user/:id';
export const GET_ALL_USERS_ROUTE = '/get-all-users';
export const GET_USER_BY_ID_ROUTE = '/user/:id';

export const GET_CATALOG_PRODUCTS_ROUTE = '/catalog-products';
export const GET_PRODUCTS_ROUTE = '/products';
export const GET_PRODUCT_ROUTE = '/product/:id';
export const ADD_PRODUCT_ROUTE = '/product';
export const DELETE_PRODUCT_ROUTE = '/product/:id';
export const UPDATE_PRODUCT_ROUTE = '/product/:id';

export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGEXP = /^([ \u00c0-\u01ffa-zA-Z'\-]+){2,}$/;
export const PASSWORD_REGEXP = /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\d+)(?=.*[#^@$!%*?&]+)[A-Za-z\d@$!%*?#^&]{8,20}$/;
