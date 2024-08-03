"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GetProductsParams {
  category?: string;
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
}

export default async function getProducts({
  category = '',
  page = 1,
  limit = 9,
  searchTerm = '',
  sortOrder = 'asc',
}: GetProductsParams) {
  const sortOption: 'asc' | 'desc' = sortOrder === 'asc' ? 'asc' : 'desc';
  const skip: number = (page - 1) * limit;

  try {
    const products = await prisma.products.findMany({
      where: {
        AND: [
          {
            Category: {
              CategoryName: {
                contains: category,
                mode: 'insensitive'
              }
            }
          },
          {
            ProductName: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      orderBy: {
        Price: sortOption
      },
      skip: skip,
      take: limit,
      include: {
        Category: true
      }
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products');
  } finally {
    await prisma.$disconnect();
  }
}
