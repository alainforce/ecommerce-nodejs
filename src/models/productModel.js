import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    
    name: { type: String },
    description: { type: String  },
    price: { type: Number  },
    salePrice: { type: Number },
    images: { type: [String]  },
    category: { type: String  },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    colors: [{ 
        value: { type: String },
        hex: { type: String }
    }],
    sizes: [{ type: String }],
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
      
});

const Product = mongoose.model("Product", productSchema);
export default Product;
