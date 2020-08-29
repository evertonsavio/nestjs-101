import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('descripton') productDescription: string,
    @Body('price') productPrice: number,
  ): { id: string } {
    const generatedID = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedID };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }
}
