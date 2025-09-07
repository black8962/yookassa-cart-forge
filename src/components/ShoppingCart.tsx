import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="shadow-card bg-gradient-card">
        <CardContent className="p-8 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Корзина пуста</h3>
          <p className="text-muted-foreground">Добавьте товары для оформления заказа</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Корзина
          <Badge variant="secondary" className="ml-auto">
            {itemCount} {itemCount === 1 ? 'товар' : itemCount < 5 ? 'товара' : 'товаров'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border bg-background/50">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{item.name}</h4>
              <p className="text-sm text-muted-foreground">
                {item.price.toLocaleString('ru-RU')} ₽ за штуку
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="font-medium w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Итого:</span>
            <span className="text-primary">{total.toLocaleString('ru-RU')} ₽</span>
          </div>

          <Button
            variant="cart"
            size="lg"
            className="w-full"
            onClick={onCheckout}
          >
            Оформить заказ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}