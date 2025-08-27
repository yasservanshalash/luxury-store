const { PrismaClient } = require('@prisma/client');

// Get the production DATABASE_URL from Vercel environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not found in environment variables');
  process.exit(1);
}

console.log('Connecting to production database...');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

async function main() {
  try {
    console.log('Starting production database seed...');
    
    // Check existing products first
    const existingProducts = await prisma.product.count();
    console.log(`Existing products in database: ${existingProducts}`);
    
    if (existingProducts > 0) {
      console.log('Products already exist in production database');
      return;
    }

    // Create categories first
    const womenCategory = await prisma.category.create({
      data: {
        name: 'Women',
        slug: 'women',
        description: 'Luxury women\'s fashion collection crafted in Beirut',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    });

    const accessoriesCategory = await prisma.category.create({
      data: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Curated luxury accessories to complete your look',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    });

    const eveningCategory = await prisma.category.create({
      data: {
        name: 'Evening Wear',
        slug: 'evening',
        description: 'Exquisite evening wear for special occasions',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    });

    // Create tags
    const luxuryTag = await prisma.tag.create({
      data: {
        name: 'Luxury',
        slug: 'luxury'
      }
    });

    const handmadeTag = await prisma.tag.create({
      data: {
        name: 'Handmade',
        slug: 'handmade'
      }
    });

    const lebanonTag = await prisma.tag.create({
      data: {
        name: 'Made in Lebanon',
        slug: 'made-in-lebanon'
      }
    });

    // Create products
    const products = [
      {
        name: 'Line by Gizia Little Black Dress',
        slug: 'concept-little-black-dress',
        description: 'Our signature little black dress reimagined with contemporary Lebanese design elements. Features hand-stitched details and a timeless silhouette that flatters every figure.',
        price: '750',
        images: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        sku: 'LBD-002',
        inventory: 12,
        material: 'Italian wool crepe',
        care: 'Dry clean only',
        isActive: true,
        isFeatured: true,
        categoryId: womenCategory.id
      },
      {
        name: 'Cashmere Wrap Coat',
        slug: 'cashmere-wrap-coat',
        description: 'A luxurious wrap coat made from the finest cashmere wool. The minimalist design features clean lines and a belt tie closure.',
        price: '1250',
        comparePrice: '1400',
        images: [
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        sku: 'CWC-003',
        inventory: 8,
        material: '100% Cashmere wool',
        care: 'Professional dry clean only',
        isActive: true,
        isFeatured: true,
        categoryId: womenCategory.id
      },
      {
        name: 'Midnight in Beirut Gown',
        slug: 'midnight-beirut-gown',
        description: 'An ethereal evening gown inspired by Beirut\'s starlit nights. Features hand-embroidered stars and flowing silk chiffon.',
        price: '2850',
        images: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1566479179817-02e8ea1e76b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        sku: 'MBG-004',
        inventory: 4,
        material: 'Silk chiffon with hand-embroidered details',
        care: 'Dry clean only',
        isActive: true,
        isFeatured: true,
        categoryId: eveningCategory.id
      },
      {
        name: 'Phoenician Heritage Necklace',
        slug: 'phoenician-heritage-necklace',
        description: 'An exquisite gold necklace inspired by ancient Phoenician jewelry designs. Handcrafted by Lebanese artisans.',
        price: '1850',
        images: [
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588444962502-5a43b3e68a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        sku: 'PHN-008',
        inventory: 6,
        material: '18k Gold with traditional engravings',
        care: 'Polish with soft cloth',
        isActive: true,
        isFeatured: true,
        categoryId: accessoriesCategory.id
      },
      {
        name: 'Artisan Leather Handbag',
        slug: 'artisan-leather-handbag',
        description: 'A timeless leather handbag crafted by Lebanese artisans using traditional techniques.',
        price: '650',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        sku: 'ALH-007',
        inventory: 18,
        material: 'Premium Italian leather',
        care: 'Leather conditioner recommended',
        isActive: true,
        isFeatured: true,
        categoryId: accessoriesCategory.id
      }
    ];

    console.log('Creating products...');
    for (const productData of products) {
      const product = await prisma.product.create({
        data: {
          ...productData,
          variants: {
            create: [
              { name: 'Size', value: 'S', isActive: true },
              { name: 'Size', value: 'M', isActive: true },
              { name: 'Size', value: 'L', isActive: true },
              { name: 'Color', value: 'Black', isActive: true }
            ]
          }
        }
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('✅ Production database seeded successfully!');
    
    // Verify the seeding worked
    const finalCount = await prisma.product.count();
    console.log(`Total products in database: ${finalCount}`);
    
  } catch (error) {
    console.error('❌ Error seeding production database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
