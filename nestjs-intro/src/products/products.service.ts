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

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(id: string): Promise<Product> {
    let product: Product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Nao encontramos o produto');
    }
    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }

    return product;
  }
  /*   getSingleProduct(productId: string): {} {
    const product = this.products.find(prod => prod.id === productId);

    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }

    return { ...product };
  } */
  /* updateProduct(productId: string, title: string, desc: string, price: number) {
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
  } */

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findId(productId);

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    updatedProduct.save();
  }

  /*     deleteProduct(prodId: string) {
    const [product, productIndex] = this.findId(prodId);

    this.products.splice(productIndex, 1);
  } */

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Nao encontramos o produto');
    }
  }

  private async findId(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (err) {
      throw new NotFoundException('Nao encontramos o produto');
    }
    if (!product) {
      throw new NotFoundException('Nao encontramos o produto');
    }

    return product;
  }
}
