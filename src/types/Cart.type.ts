export interface CartData {
    status:         string;
    message:        string;
    numOfCartItems: number;
    cartId:         string;
    data:           Data;
}
export interface Data {
    _id:            string;
    cartOwner:      string;
    products:       Product[];
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
    totalCartPrice: number;
}

export interface Product {
    count:   number;
    _id:     string;
    product: ProductProduct;
    price:   number;
}

export interface ProductProduct {
    _id:            string;
    title:          string;
    quantity:       number;
    imageCover:     string;
    ratingsAverage: number;
    id:             string;
}