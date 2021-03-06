import {ProductModel} from '../../dataBase';
import {IProduct} from '../../models';

class ProductService {
  createdProduct(product: IProduct) {
    const productToSave = new ProductModel(product);

    return productToSave.save();
  }
}

export const productService = new ProductService();
