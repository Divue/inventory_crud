import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import products from "../data/products.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    const deleted = await Product.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} existing products`);

    // Insert seed data
    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products`);

    console.log("\n📦 Seeded Products:");
    inserted.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name} (${p.sku}) — ₹${p.price}`);
    });

    console.log("\n🎉 Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
