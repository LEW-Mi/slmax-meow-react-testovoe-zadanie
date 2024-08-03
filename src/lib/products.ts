import { Product } from "../types/product";

const products: Product [] = [
{   id: '1',
    name: 'Product_1',
    description: 'Description for product 1',
    price: 100,
    imageUrl: '/images/1.jpg'
},
{   id: '2',
    name: 'Product_2',
    description: 'Description for product 2',
    price: 150,
    imageUrl: '/images/2.jpg' 
},
{   id: '3',
    name: 'Product_3',
    description: 'Description for product 3',
    price: 300,
    imageUrl: '/images/3.jpg'
}];

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products), 500);
    });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    return products.find(product => product.id === id);
};