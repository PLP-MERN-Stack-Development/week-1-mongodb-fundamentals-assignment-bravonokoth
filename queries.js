// queries.js
use plp_bookstore;

// CRUD
db.books.insertOne({
   title: "Dune",
   author: "Frank Herbert",
   genre: "Sci-Fi",
   published_year: 1965,
   price: 25.99,
   in_stock: true,
   pages: 412,
   publisher: "Chilton Books"
});
db.books.find({ author: "George Orwell" }).pretty();
db.books.updateOne(
   { title: "The Alchemist" },
   { $set: { price: 15.99, in_stock: false } }
);
db.books.deleteOne({ title: "Moby Dick" });

// Advanced Queries
db.books.find({ published_year: { $gt: 1950 } }).pretty();
db.books.find({ in_stock: true }, { title: 1, author: 1, _id: 0 }).pretty();
db.books.find().sort({ price: -1 }).pretty();

// Aggregation
db.books.aggregate([
   {
      $group: {
         _id: "$genre",
         averagePrice: { $avg: "$price" },
         totalPages: { $sum: "$pages" },
         bookCount: { $sum: 1 }
      }
   }
]).pretty();

// Indexing
db.books.createIndex({ genre: 1 });