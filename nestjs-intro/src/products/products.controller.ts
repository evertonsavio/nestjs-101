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
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('descripton') productDescription: string,
    @Body('price') productPrice: number,
  ) {
    this.productsService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') productId: string): string {
    this.productsService.deleteProduct(productId);
    return 'Deletado com sucesso';
  }
}
