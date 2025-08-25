import { connectDatabase } from './lib/db';
import { Category } from './models/Category';
import { Product } from './models/Product';

async function run() {
  await connectDatabase();

  const categories = [
    { name: 'Men Clothing', slug: 'men-clothing', description: 'Shirts, T-shirts, Pants' },
    { name: 'Women Clothing', slug: 'women-clothing', description: 'Sarees, Salwar Kameez, Tops' },
    { name: 'Shoes', slug: 'shoes', description: 'Sneakers, Sandals, Formal' },
  ];
  await Category.deleteMany({});
  const createdCats = await Category.insertMany(categories);

  await Product.deleteMany({});
  await Product.insertMany([
    {
      title: 'Classic Cotton Panjabi',
      slug: 'classic-cotton-panjabi',
      description: 'Comfortable cotton Panjabi ideal for festivals and Fridays.',
      categoryId: createdCats[0]!._id,
      brand: 'BD Heritage',
      images: [],
      sizes: ['S','M','L','XL'],
      colors: ['White','Black','Navy'],
      price: { amount: 1490, currency: 'BDT' },
      compareAtPrice: { amount: 1990, currency: 'BDT' },
      stock: 50,
      isActive: true,
    },
    {
      title: 'Women’s Linen Saree',
      slug: 'womens-linen-saree',
      description: 'Lightweight linen saree with elegant border.',
      categoryId: createdCats[1]!._id,
      brand: 'Dhakai',
      images: [],
      sizes: [],
      colors: ['Red','Blue','Green'],
      price: { amount: 2490, currency: 'BDT' },
      stock: 30,
      isActive: true,
    },
    {
      title: 'Casual Sneakers',
      slug: 'casual-sneakers',
      description: 'Everyday sneakers with cushioned sole.',
      categoryId: createdCats[2]!._id,
      brand: 'Dhaka Walk',
      images: [],
      sizes: ['40','41','42','43'],
      colors: ['Black','Gray'],
      price: { amount: 1890, currency: 'BDT' },
      stock: 40,
      isActive: true,
    }
  ]);

  // eslint-disable-next-line no-console
  console.log('Seed completed');
  process.exit(0);
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

