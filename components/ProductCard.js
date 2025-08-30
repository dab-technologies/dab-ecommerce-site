import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MessageCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  const handleInterest = async () => {
    try {
      await fetch(`/api/products/${product._id}/interest`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to record interest:', error);
    }
  };
  const handleWhatsApp = () => {
    handleInterest();

    // Get number from env or fallback to default
    const whatsappNumber = process.env.DEFAULT_WHATSAPP_NUMBER || "+233551015625";

    const message = encodeURIComponent(
      `Hi, I'm interested in ${product.name} - GH₵${product.price}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-white"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.tags?.map((tag) => (
            <Badge 
              key={tag} 
              variant={tag === 'hot deal' ? 'destructive' : tag === 'new' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
          {product.status === 'sold out' && (
            <Badge variant="outline" className="bg-gray-100 text-gray-600">
              Sold Out
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-[#1A1A1A]">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-green-600">GHS {product.price}</span>
          <Badge variant="outline">{product.brand}</Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/products/${product._id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
        {product.status === 'available' && (
          <Button 
            onClick={handleWhatsApp}
            className="flex-1 hover:bg-[#0E949A] bg-[#0E948A] text-white"
            size="sm"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
