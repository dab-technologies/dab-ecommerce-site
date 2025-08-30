"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

// Define the shape of the filter state
export interface Filters {
  minPrice: string;
  maxPrice: string;
  brands: string[];
  categories: string[];
  tags: string[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  brand: string;
  category: string;
  tags?: string[];
  featured?: boolean;
}


export default function FilterSidebar({
  onFilterChange,
  isOpen,
  onClose,
}: {
  onFilterChange: (filters: Filters) => void;
  isOpen: boolean;
  onClose?: () => void;
}) {
const [filters, setFilters] = useState<Filters>({
  minPrice: '',
  maxPrice: '',
  brands: [],
  categories: [],
  tags: [],
});


  const categories = ["phones", "laptops","cars", "accessories"];
  const tags = ["new", "hot deal", "used"];

  const handleFilterChange = (
    type: keyof Filters,
    value: string,
    checked: boolean | null = null
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "minPrice" || type === "maxPrice") {
        newFilters[type] = value;
      } else if (checked !== null) {
        if (checked) {
          newFilters[type] = [...prev[type], value];
        } else {
          newFilters[type] = prev[type].filter((item) => item !== value);
        }
      }

      return newFilters;
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (onClose) onClose();
  };

  const clearFilters = () => {
    const clearedFilters: Filters = {
      minPrice: "",
      maxPrice: "",
      brands: [],
      categories: [],
      tags: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Price Range
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              Categories
            </Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("categories", category, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tags */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">Tags</Label>
            <div className="space-y-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={(checked) =>
                      handleFilterChange("tags", tag, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`tag-${tag}`}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={applyFilters}
              className="w-full hover:bg-[#0E949A] bg-[#0E948A] text=white"
            >
              Apply Filters
            </Button>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full text-[#F87171]"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
