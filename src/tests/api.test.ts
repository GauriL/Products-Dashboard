import { suite, test, assert } from 'vitest';
import { fetchProducts } from '../services/api';

suite('Products component', () => {
  test('handles fetch error gracefully', async () => {
    globalThis.fetch = async () => {
      throw new Error('API error');
    };

    try {
      await fetchProducts();
    } catch (error: unknown) {
      const apiError = error as Error;
            assert.equal(apiError.message, 'API error');
    }
  });

  test('fetches products successfully', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Product 1',
        category: 'Category 1',
        brand: 'Brand 1',
        price: 20,
        stock: 10,
        rating: 4,
      },
      {
        id: 2,
        title: 'Product 2',
        category: 'Category 2',
        brand: 'Brand 2',
        price: 30,
        stock: 5,
        rating: 3,
      },
    ];
  
    globalThis.fetch = async () => ({
      json: async () => ({ products: mockProducts }),
    } as Response);
  
    const products = await fetchProducts();
  
    assert.deepEqual(products, mockProducts);
  });
  
});

//use npx vitest to run tests