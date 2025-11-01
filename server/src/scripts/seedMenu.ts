import 'dotenv/config';
import mongoose from 'mongoose';
import { Menu } from '../models/Menu.js';
import { Category } from '../models/Category.js';
import { connectDB } from '../config/db.js';

async function seed() {
  await connectDB();
  await Menu.deleteMany({});
  await Category.deleteMany({});

  const categories = await Category.insertMany([
    { name: 'Appetizer' },
    { name: 'Main' },
    { name: 'Soup' },
    { name: 'Drink' },
  ]);

  const menuItems = [
    { name: 'Kimchi Pancake', price: 12.99, category: categories[0]._id, image: 'kimchi_pancake.jpg' },
    { name: 'Bulgogi Rice', price: 14.99, category: categories[1]._id, image: 'bulgogi_rice.jpg' },
    { name: 'Soft Tofu Stew', price: 13.99, category: categories[2]._id, image: 'soondubu.jpg' },
    { name: 'Bibimbap', price: 15.5, category: categories[1]._id, image: 'bibimbap.jpg' },
    { name: 'Green Tea', price: 3.99, category: categories[3]._id, image: 'greentea.jpg' },
  ];

  await Menu.insertMany(menuItems);
  console.log('✅ Seed completed!');
  process.exit();
}

seed();

