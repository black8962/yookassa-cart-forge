import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, User, MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutFormProps {
  items: CartItem[];
  onSubmit: (orderData: OrderData) => void;
  onBack: () => void;
}

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  totalPrice: number;
}

export function CheckoutForm({ items, onSubmit, onBack }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData: OrderData = {
      ...formData,
      items,
      totalPrice: total,
    };
    
    onSubmit(orderData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.customerName && formData.customerEmail && 
                     formData.customerPhone && formData.customerAddress;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Ваш заказ
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {item.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <span className="font-semibold">
                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          ))}
          
          <Separator />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Итого:</span>
            <span className="text-primary">{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          
          <Badge variant="secondary" className="w-full justify-center py-2">
            Оплата через YooKassa
          </Badge>
        </CardContent>
      </Card>

      {/* Customer Information Form */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Информация о покупателе
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Имя и фамилия
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите ваше имя и фамилию"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Телефон
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Адрес доставки
              </Label>
              <Textarea
                id="address"
                placeholder="Введите полный адрес доставки"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Назад к корзине
              </Button>
              <Button
                type="submit"
                variant="cart"
                disabled={!isFormValid}
                className="flex-1"
              >
                Оплатить {total.toLocaleString('ru-RU')} ₽
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}