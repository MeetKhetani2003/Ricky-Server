import mongoose, { Document, Schema } from 'mongoose';

import Category from './Category.js';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      unique: [true, 'Product name must be unique.'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required.'],
      trim: true,
    },
    productDetails: [
      {
        key: { type: String, required: false },
        value: { type: String, required: false },
      },
    ],
    productImgs: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    //   versionKey: false,
    //   transform(doc, ret) {
    //     delete ret._id;
    //   },
    // },
  }
);

// productSchema.pre('save', async function (next) {
//   try {
//     // If category is already an ObjectId, skip lookup
//     if (!mongoose.Types.ObjectId.isValid(this.category)) {
//       const category = await Category.findOne({ name: this.category });
//       console.log(category);

//       if (!category) return next(new Error('Category not found'));

//       this.category = category.name; // Convert category name to ObjectId
//     }

//     // Update category's products array
//     await Category.findByIdAndUpdate(
//       this.category,
//       { $addToSet: { products: this._id } }, // Add product ID to category's products array (avoid duplicates)
//       { new: true }
//     );

//     next(); // Proceed with saving
//   } catch (error) {
//     next(error);
//   }
// });
export default mongoose.model('Product', productSchema);
