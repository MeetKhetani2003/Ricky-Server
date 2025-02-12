import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required.'],
      trim: true,
      unique: [true, 'Category name must be unique.'],
      index: true,
    },
    img: {
      type: String,
      required: [true, 'Category image is required.'],
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
