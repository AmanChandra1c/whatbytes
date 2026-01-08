import ProductList from "@/components/ProductList";

async function getProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      cache: "force-cache",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

export default async function Home() {
  const data = await getProducts();
  const products = data.products || [];
  const categories = [...new Set(products.map((p) => p.category))];
  const maxPrice =
    products.length > 0 ? Math.max(...products.map((p) => p.price)) : 1000;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductList
        products={products}
        categories={categories}
        maxPrice={maxPrice}
      />
    </div>
  );
}
