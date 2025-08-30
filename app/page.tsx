'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Loader2 } from 'lucide-react';
import Footer from "../components/footer";
import AboutModal from '@/components/aboutModal';
import ContactModal from '@/components/contactModal';
import { Filters } from '@/components/FilterSidebar';
import { Product } from '../components/FilterSidebar';
export default function Home() {
const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
const [appliedFilters, setAppliedFilters] = useState<Filters>({
  minPrice: '',
  maxPrice: '',
  brands: [],
  categories: [],
  tags: [],
});
  const router = useRouter();
    const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, appliedFilters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (appliedFilters.minPrice) {
        params.append('minPrice', appliedFilters.minPrice);
      }
      if (appliedFilters.maxPrice) {
        params.append('maxPrice', appliedFilters.maxPrice);
      }
      if (appliedFilters.categories?.length > 0) {
        appliedFilters.categories.forEach(cat => params.append('category', cat));
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      if (response.ok) {
        let data: Product[] = await response.json();


        if (appliedFilters.tags?.length > 0) {
          data = data.filter((product: Product) =>
  product.tags?.some(tag => appliedFilters.tags.includes(tag))
);
        }

        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setTimeout(() => {
      fetchProducts();
    }, 300);
  };

  const handleFilterChange = (filters: Filters) => {
    setAppliedFilters(filters);
  };

const featuredProducts = products.filter((product: Product) => product.featured);


  return (
    <>
      <Head>
        <title>DAB-Technologies - Modern E-commerce Platform</title>
        <meta name="description" content="Discover amazing products including phones, laptops, cars, and accessories at great prices." />
        <meta name="keywords" content="e-commerce, phones, laptops, cars, accessories, online shopping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar 
      onSearch={handleSearch} 
      searchTerm={searchTerm} 
      onOpenAbout={() => setAboutOpen(true)}
      onOpenContact={() => setContactOpen(true)}
      />

      <main className="min-h-screen  font-[Lato, sans-serif] text-[#1A1A1A]">
        {/* Hero Section */}
        <section
  className="relative bg-cover bg-center bg-no-repeat py-16 text-white"
  style={{ backgroundImage: "url('/hero.jpg')" }}
>
  {/* Optional overlay for readability */}
  <div className="absolute inset-0 bg-black/40" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Welcome to DAB-Technologies
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-white/80">
      Discover amazing products at unbeatable prices
    </p>
    <Button size="lg" className="bg-white text-white hover:bg-[#0E949A] bg-[#0E948A]">
      Shop Now
    </Button>
  </div>
</section>


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-3xl font-bold text-[#1A1A1A]">Featured Products</h2>
                <Badge variant="secondary">Hot</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Main Content */}
          <div className="flex gap-8 relative">
            {/* Sidebar for large screens */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                onFilterChange={handleFilterChange}
                isOpen={true}
                onClose={() => {}}
              />
            </aside>

            {/* Sidebar overlay for mobile */}
            {showFilters && (
              <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto lg:hidden shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button variant="outline" onClick={() => setShowFilters(false)}>
                    Close
                  </Button>
                </div>
                <FilterSidebar
                  onFilterChange={(filters) => {
                    handleFilterChange(filters);
                    setShowFilters(false);
                  }}
                  isOpen={true}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">
                    {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                  </h2>
                  <Badge variant="outline">{products.length} items</Badge>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-[#00A8F3]" />
                  <span className="ml-2 text-gray-600">Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: Product) => (
  <ProductCard key={product._id} product={product} />
))}

                </div>
              )}
            </div>
          </div>
        </div>
      </main>
       {/* Modals */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer
      
      onOpenAbout={() => setAboutOpen(true)}
      onOpenContact={() => setContactOpen(true)}
      />
    </>
  );
}