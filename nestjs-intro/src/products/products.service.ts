import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = []; // LEMBRAR DE COLOCAR PRIVATE PRA SO O METODO ACESSAR

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString(); //dummy id
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);

    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string): {} {
    const product = this.products.find(prod => prod.id === productId);

    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }

    return { ...product };
  }
}
