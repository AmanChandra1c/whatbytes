# WhatBytes E-Commerce Application

A modern, responsive e-commerce application built with Next.js, React, and Tailwind CSS. Features product listing, filtering, shopping cart functionality, and toast notifications.

## 🚀 Live Demo

**Live Demo:** [https://whatbytes-demo.vercel.app](https://whatbytes-demo.vercel.app)

> ⚠️ *Note: The live demo uses the DummyJSON API for product data. Some features may have limitations based on the free API tier.*

## 📋 Features

- **Product Listing**: Browse products with search and filtering capabilities
- **Advanced Filtering**: Filter by category and price range with responsive mobile design
- **Shopping Cart**: Add, remove, and update item quantities with real-time calculations
- **Toast Notifications**: User-friendly feedback for all cart actions
- **Mobile Responsive**: Optimized for all device sizes with collapsible mobile filters
- **Persistent Cart**: Cart items persist across browser sessions using localStorage
- **Modern UI**: Clean, professional interface with smooth transitions and hover effects

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.1, React 19.2.3
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand 5.0.9 with persistence
- **Icons**: Lucide React 0.562.0
- **Toast Notifications**: react-hot-toast
- **API**: DummyJSON (https://dummyjson.com/products)

## 📡 API Endpoints

### Products API
- **Base URL**: `https://dummyjson.com/products`
- **Get All Products**: `GET /products`
- **Get Single Product**: `GET /products/{id}`
- **Search Products**: `GET /products/search?q={query}`
- **Get Categories**: `GET /products/categories`
- **Filter by Category**: `GET /products/category/{category}`

### Response Format
```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "thumbnail": "https://example.com/image.jpg",
      "category": "category-name",
      "rating": 4.5,
      "stock": 100
    }
  ],
  "total": 100,
  "skip": 0,
  "limit": 30
}
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── cart/
│   │   └── page.js           # Shopping cart page
│   ├── product/
│   │   └── [id]/
│   │       └── page.js       # Product detail page
│   ├── layout.js             # Root layout with ToastProvider
│   └── page.js               # Home page with product listing
├── components/
│   ├── Filters.js            # Product filters component
│   ├── Footer.js             # Footer component
│   ├── Header.js             # Header with search
│   ├── ProductCard.js        # Product card component
│   └── ToastProvider.js      # Toast notification provider
└── store/
    └── cartStore.js          # Zustand cart store with persistence
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/whatbytes.git
   cd whatbytes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Mobile Features

- **Collapsible Filters**: Floating filter button on mobile with slide-out sidebar
- **Responsive Grid**: Adaptive layout (1/2/3 columns based on screen size)
- **Touch-Friendly**: Optimized button sizes and spacing for mobile interaction
- **Mobile Cart**: Stacked layout for cart items on smaller screens

## 🛒 Cart Functionality

### Features
- **Add to Cart**: Items are added with success toast notifications
- **Quantity Updates**: Increment/decrement with real-time price updates
- **Remove Items**: Delete functionality with confirmation toast
- **Persistent Storage**: Cart data persists across browser sessions
- **Price Calculations**: Automatic subtotal, tax (10%), and total calculations

### Cart Store API
```javascript
// Add item to cart
addToCart(product)

// Update item quantity
updateQuantity(id, quantity)

// Remove item from cart
removeItem(id)

// Clear entire cart
clearCart()

// Get total items count
getTotalItems()

// Get total price
getTotalPrice()
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue 600 (#2563eb)
- **Success**: Green 500 (#10b981)
- **Error**: Red 500 (#ef4444)
- **Gray Scale**: Various shades for text and backgrounds

### Typography
- **Headings**: Geist Sans font family
- **Body**: Geist Sans with antialiasing
- **Responsive**: Smaller text sizes on mobile devices

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

### Tailwind Configuration
The project uses Tailwind CSS 4.0 with responsive breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚦 Development Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support or questions, please open an issue on the GitHub repository or contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**
