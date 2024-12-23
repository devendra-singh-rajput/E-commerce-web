import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import summmryApi from '../common';
import productCategroy from '../helpers/productCategory';
import SearchVerticalCard from '../components/searchVerticalCard';

const ProductCategory = () => {
  const { category } = useParams();
  const location=useLocation() 
  const params=location.search.split('=')
  const [loading,setLoading]=useState(false)
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [filters, setFilters] = useState({
    sortBy: '',
    priceRange: [0, 100000], // Example price range
    brand: '',
    selectedCategory: params[1] || '' // Set category from the URL or empty if not available
  });

  useEffect(() => {
    // Fetch products whenever category or filters change
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${summmryApi.getFilterProducts.url}?category=${filters.selectedCategory}`, {
          params: {
            ...filters, // Include all filters in the request
            minPrice: filters.priceRange[0],
            maxPrice: filters.priceRange[1],
          }, // Pass all filters including sort and price range
        });

        // Ensure response data is an array
        const productData = Array.isArray(response.data.data) ? response.data.data : [];
        setProducts(productData);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [filters]); // Dependency array includes filters to trigger whenever filters change

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    
    handleFilterChange('selectedCategory', event.target.value);
  };

  // Handle sorting change
  const handleSortChange = (event) => {
    handleFilterChange('sortBy', event.target.value);
  };

  return (
    <div className='container  p-4'>
      {/* Desktop version */}
      <div className='grid lg:grid-cols-[240px,1fr] gap-4'>
        {/* Left side filter panel */}
        <div className='bg-white p-4 md:min-h-[calc(100vh-120px)] overflow-y-scroll min-w-fit'>
          <h3 className='text-lg  uppercase text-slate-500 font-medium border-b pb-1 border-slate-300'>
            Sort By
          </h3>
          {/* Sort by radio buttons */}
          <form className='text-sm flex flex-col gap-2 py-1'>
            <div className='flex items-center gap-2'>
              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value="priceAsc"
                  checked={filters.sortBy === 'priceAsc'}
                  onChange={handleSortChange}
                  className='mx-2'
                />
                Price - Low to High
              </label>
            </div>
            <div className='flex items-center gap-2'>
              <label>
                <input
                  type="radio"
                  name="sortBy"
                  value="priceDesc"
                  checked={filters.sortBy === 'priceDesc'}
                  onChange={handleSortChange}
                  className='mx-2'
                />
                Price - High to Low
              </label>
            </div>
          </form>

          {/* Category filter */}
          <h3 className='text-lg mt-6 uppercase text-slate-500 font-medium border-b pb-1 border-slate-300'>
            Category
          </h3>
          <form className='text-sm flex flex-col gap-2 py-1'>
            <div>
              <select
                id="categorySelect"
                value={filters.selectedCategory}
                onChange={handleCategoryChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="">-- All Category --</option>
                {productCategroy.map(({ id, label, value }) => (
                  <option key={id} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Price range filter */}
          <h3 className='text-lg mt-6 uppercase text-slate-500 font-medium border-b pb-1 border-slate-300'>Price Range</h3>
          <input
          className='w-full'
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value, 10)])}
          />
          <p>{`Up to ₹${filters.priceRange[1]}`}</p>

          {/* Brand filter */}
          <h3 className='text-lg mt-6 uppercase text-slate-500 font-medium border-b pb-1  border-slate-300'>Brand</h3>
          <input
            type="text"
            placeholder="Search Brand"
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Right side product display */}
        <div className='grid gap-4 max-h-[calc(100vh-100px)] overflow-y-scroll'>
          <div>
            <p className='font-medium text-lg text-slate-800 '>Search reasults : {products.length}</p>
          </div>
          <div>
          {products.length > 0 ? (
            <SearchVerticalCard loading={loading} data={products}/>
          ) : (
            <p>No products found.</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
