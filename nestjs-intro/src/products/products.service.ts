import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  private products: Product[] = []; // LEMBRAR DE COLOCAR PRIVATE PRA SO O METODO ACESSAR

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    console.log(result);
    return newProduct.id as string;
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
