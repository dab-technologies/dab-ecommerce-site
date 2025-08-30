  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import Head from 'next/head';
  import Link from 'next/link';
  import { Card, CardContent } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';
  import { Badge } from '@/components/ui/badge';
  import { Separator } from '@/components/ui/separator';
  import { ArrowLeft, MessageCircle, Heart, Share2, Loader2 } from 'lucide-react';
  // import Navbar from '../../components/Navbar';
  import './[id].css';

  export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      if (id) {
        fetchProduct();
      }
    }, [id]);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    const handleInterest = async () => {
      try {
        await fetch(`/api/products/${id}/interest`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to record interest:', error);
      }
    };

    const handleWhatsApp = () => {
      handleInterest();

      // Get number from env or fallback to default
      const whatsappNumber = process.env.DEFAULT_WHATSAPP_NUMBER || "233551015625";

      const message = encodeURIComponent(
        `Hi, I'm interested in ${product.name} - GH₵${product.price}`
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    };

    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: `Check out this ${product.name} for GHS${product.price}`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    };

    if (loading) {
      return (
        <>
          {/* <Navbar /> */}
          <div className="loading-container">
            <div className="loading-content">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading product...</span>
            </div>
          </div>
        </>
      );
    }

    if (error || !product) {
      return (
        <>
          {/* <Navbar /> */}
          <div className="error-container">
            <div className="error-content">
              <h1 className="error-title">Product Not Found</h1>
              <p className="error-message">{error || 'The product you are looking for does not exist.'}</p>
              <Link href="/">
                <button className="btn btn-outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </button>
              </Link>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Head>
          <title>{product.name} - EcoStore</title>
          <meta name="description" content={product.description} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta property="og:image" content={product.image} />
          <meta property="og:type" content="product" />
        </Head>

        {/* <Navbar /> */}

        <main className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-lg text-gray-600">
              <Link href="/" className="breadcrumb-link">Home</Link>
              <span>/</span>
              <Link href={`/?category=${product.category}`} className="breadcrumb-link capitalize">
                {product.category}
              </Link>
              <span>/</span>
              <span className="breadcrumb-current">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div className="product-info">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`badge ${tag === 'hot deal' ? 'badge-destructive' : tag === 'new' ? 'badge-default' : 'badge-secondary'}`}
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className={`badge ${product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="product-price">
                      GHS{product.price}
                    </span>
                    <span className="badge badge-outline product-brand-badge">
                      {product.brand}
                    </span>
                  </div>
                </div>

                <hr className="separator" />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <hr className="separator" />

                <div className="product-details-grid">
                  <div>
                    <span className="product-detail-label">Category:</span>
                    <p className="capitalize">{product.category}</p>
                  </div>
                  <div>
                    <span className="product-detail-label">Brand:</span>
                    <p>{product.brand}</p>
                  </div>
                  <div>
                    <span className="product-detail-label">Status:</span>
                    <p className="capitalize">{product.status}</p>
                  </div>
                  <div>
                    <span className="product-detail-label">Interests:</span>
                    <p>{product.interests || 0} people interested</p>
                  </div>
                </div>

                <hr className="separator" />

                {/* Action Buttons */}
                <div className="space-y-4">
                  {product.status === 'available' ? (
                    <button
                      onClick={handleWhatsApp}
                      className="whatsapp-btn"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Contact Seller on WhatsApp
                    </button>
                  ) : (
                    <button className="whatsapp-btn" disabled>
                      Currently Sold Out
                    </button>
                  )}

                  <div className="action-buttons">
                    <button onClick={handleInterest} className="btn btn-outline interest-btn">
                      <Heart className="w-4 h-4 mr-2" />
                      I'm Interested
                    </button>
                    <button onClick={handleShare} className="btn btn-outline">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
              <Link href="/">
                <button className="btn btn-outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }