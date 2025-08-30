'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Navbar({ onSearch, searchTerm = '', onOpenAbout, onOpenContact }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Phones', value: 'phones' },
    { name: 'Laptops', value: 'laptops' },
    { name: 'Cars', value: 'cars' },
    { name: 'Accessories', value: 'accessories' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  return (
<nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-12 m-0 p-0">
          <img src="logo.png" className="w-full h-full object-cover" />
        </div>
        <span className="text-xl font-bold text-gray-900">DAB-Technologies</span>
      </Link>

      {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">           <button
            onClick={onOpenAbout}
            className="text-gray-600 hover:text-[#0E949A] transition-colors duration-200"
          >
            About Us
          </button>
            <button
              onClick={onOpenContact}
              className="text-gray-600 hover:text-[#0E949A] transition-colors duration-200"
            >
              Contact
            </button>

          <Link href="/admin/login">
              <button
                className="text-gray-600 hover:text-[#0E949A] transition-colors duration-200"
              >
                Admin
              </button>
            </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="hover:bg-[#0E949A] bg-[#0E948A] text-white"
        >
          Search
        </Button>
      </form>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden py-4 border-t">
        {/* Search (Mobile) */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10 mb-2"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="w-full hover:bg-[#0E949A] bg-[#0E948A] text-white"
          >
            Search
          </Button>
        </form>

        {/* Mobile Links */}
        <div className="space-y-2">
              <button
                onClick={() => {
                  onOpenAbout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-gray-600 hover:text-[#0E949A]"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  onOpenContact();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-gray-600 hover:text-[#0E949A]"
              >
                Contact
              </button>

              <Link href="/admin/login">
              <button
                
                className="block py-2 text-gray-600 hover:text-[#0E949A]"
              >
                Admin
              </button>
              </Link>

        </div>
      </div>
    )}
  </div>
</nav>

  );
}