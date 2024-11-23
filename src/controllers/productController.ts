import { Request, Response, NextFunction } from 'express';
import Product from '../models/productModel';
import { createProductSchema, updateProductSchema } from '../dtos/productDTO';

// Créer un produit
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = createProductSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.errors.map(err => ({
          path: err.path,
          message: err.message,
        })),
      });
      return;
    }

    const product = new Product(parsed.data);
    const savedProduct = await product.save();

    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the middleware
  }
};

// Obtenir tous les produits
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Récupérer un produit par ID
export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: 'Invalid product ID format' });
      return;
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Mettre à jour un produit
export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        errors: parsed.error.errors.map(err => ({
          path: err.path,
          message: err.message,
        })),
      });
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, parsed.data, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Supprimer un produit
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
