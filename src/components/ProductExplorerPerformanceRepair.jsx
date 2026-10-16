import React, { useState, useMemo, useCallback } from "react";
import "../css/ProductExplorerPerformanceRepair.css";

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home"];

const PRODUCTS = Array.from({ length: 600 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category: CATEGORIES[index % CATEGORIES.length],
  price: (index % 100) + 10,
}));

const ProductList = React.memo(function ProductList({ products, onSelectProduct }) {
  return (
    <div>
      <h4>Product Results ({products.length})</h4>
      <ul className="product-scroll-list">
        {products.map((product) => (
          <li key={product.id} className="product-row">
            <span>
              <strong>{product.name}</strong> - ${product.price} ({product.category})
            </span>
            <button className="btn-select" onClick={() => onSelectProduct(product)}>
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default function ProductExplorerPerformanceRepair() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [search, selectedCategory, sortOrder]);

  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div className="product-explorer-card">
      <h2 className="explorer-title">Product Explorer Performance Repair</h2>

      <div className="unrelated-box">
        <p>Unrelated Counter: {unrelatedCount}</p>
        <button onClick={() => setUnrelatedCount((prev) => prev + 1)}>
          Increment Unrelated Counter
        </button>
      </div>

      <div className="filter-grid">
        <input
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}>
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>

      {selectedProduct && (
        <div className="selected-product-banner">
          Selected: <strong>{selectedProduct.name}</strong> (${selectedProduct.price})
        </div>
      )}

      <ProductList
        products={filteredAndSortedProducts}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}