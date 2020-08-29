import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    //Nao necessario especificar nesse caso
    const generatedID = await this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedID };
    //return { productTitle:  };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('descripton') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    await this.productsService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
    return null;
  }

<<<<<<< HEAD
  @Delete(':id')
  async removeProduct(
    @Param('id') productId: string,
  ): Promise<{ message: string }> {
    await this.productsService.deleteProduct(productId);
    return { message: 'Deletado com sucesso' };
  }
=======
  /*   @Delete(':id')
  removeProduct(@Param('id') productId: string): string {
    this.productsService.deleteProduct(productId);
    return 'Deletado com sucesso';
  } */
>>>>>>> b41d1ce82cd8d0299a418582bf5bb24a7a6d48df
}
