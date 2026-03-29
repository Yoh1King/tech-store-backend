import type { Product, Category } from "./api";

export const mockCategories: Category[] = [
  { id: "1", name: "Laptops" },
  { id: "2", name: "Smartphones" },
  { id: "3", name: "Accessories" },
  { id: "4", name: "Audio" },
  { id: "5", name: "Gaming" },
];

export const mockProducts: Product[] = [
  { id: "1", name: "MacBook Pro 16\"", description: "Apple M3 Pro chip, 18GB RAM, 512GB SSD", price: "2499.99", stock: 15, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=350&fit=crop", featured: true, categoryId: "1", category: mockCategories[0] },
  { id: "2", name: "Dell XPS 15", description: "Intel i7, 16GB RAM, 512GB SSD, OLED display", price: "1799.99", stock: 20, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=350&fit=crop", featured: true, categoryId: "1", category: mockCategories[0] },
  { id: "3", name: "iPhone 15 Pro", description: "A17 Pro chip, 256GB, Titanium design", price: "1199.99", stock: 30, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&h=350&fit=crop", featured: true, categoryId: "2", category: mockCategories[1] },
  { id: "4", name: "Galaxy S24 Ultra", description: "Snapdragon 8 Gen 3, 256GB, AI features", price: "1299.99", stock: 25, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=350&fit=crop", featured: true, categoryId: "2", category: mockCategories[1] },
  { id: "5", name: "AirPods Pro 2", description: "Active Noise Cancellation, USB-C charging", price: "249.99", stock: 50, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=350&fit=crop", featured: false, categoryId: "4", category: mockCategories[3] },
  { id: "6", name: "Sony WH-1000XM5", description: "Premium wireless noise cancelling headphones", price: "349.99", stock: 35, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=350&fit=crop", featured: true, categoryId: "4", category: mockCategories[3] },
  { id: "7", name: "MX Master 3S", description: "Wireless ergonomic mouse, 8K DPI sensor", price: "99.99", stock: 60, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=350&fit=crop", featured: false, categoryId: "3", category: mockCategories[2] },
  { id: "8", name: "PS5 DualSense", description: "Wireless controller with haptic feedback", price: "69.99", stock: 40, image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=350&fit=crop", featured: false, categoryId: "5", category: mockCategories[4] },
];
