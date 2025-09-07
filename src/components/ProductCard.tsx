import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 transform hover:scale-105 animate-fade-in bg-gradient-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {product.category}
          </Badge>
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Осталось {product.stock}
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Нет в наличии
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        
        {product.stock > 0 && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Количество:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="cart"
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Нет в наличии' : 'В корзину'}
        </Button>
      </CardFooter>
    </Card>
  );
}