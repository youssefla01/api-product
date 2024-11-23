import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  type: z.string().min(1, 'Le type est requis'),
  price: z.number().min(0, 'Le prix doit être supérieur à 0'),
  rating: z.number().min(0, 'La note doit être entre 0 et 5').max(5),
  warranty_years: z.number().min(1, 'La garantie doit être d\'au moins 1 an'),
  available: z.boolean(),
});

export const updateProductSchema = createProductSchema.partial();
