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
  updateProduct(productId: string, title: string, desc: string, price: number) {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const [product, productIndex] = this.findId(prodId);

    this.products.splice(productIndex, 1);
  }

  findId(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === productId);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }

    return [product, productIndex];
  }
}
