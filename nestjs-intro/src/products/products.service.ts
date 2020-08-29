import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  products: Product[] = [];
  insertProduct(title: string, desc: string, price: number): string {
    const prodId = new Date().toString(); //dummy id
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);

    return prodId;
  }
}
