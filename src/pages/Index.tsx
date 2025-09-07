import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingCart } from "@/components/ShoppingCart";
import { CheckoutForm, OrderData } from "@/components/CheckoutForm";
import { SelfEmployedInfo } from "@/components/SelfEmployedInfo";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingBag, 
  Search, 
  Star, 
  CreditCard, 
  Shield, 
  Truck, 
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import productsShowcase from "@/assets/products-showcase.jpg";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

type ViewState = 'products' | 'cart' | 'checkout';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentView, setCurrentView] = useState<ViewState>('products');
  const { items, addToCart, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Товар добавлен в корзину",
        description: `${product.name} (${quantity} шт.)`,
      });
    }
  };

  const handleCheckout = async (orderData: OrderData) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          customer_address: orderData.customerAddress,
          products: orderData.items as any,
          total_price: orderData.totalPrice,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Заказ оформлен",
        description: `Заказ №${data.id} успешно создан`,
      });

      clearCart();
      setCurrentView('products');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ",
        variant: "destructive"
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white sticky top-0 z-50 shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShoppingBag className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">frostmarket</h1>
                <p className="text-sm text-white/80">Цифровые товары и услуги</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {currentView !== 'cart' && (
                <Button 
                  variant="secondary"
                  onClick={() => setCurrentView('cart')}
                  className="relative"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Корзина
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {currentView === 'products' && (
        <>
          {/* Hero Section */}
          <section className="relative bg-gradient-hero text-white overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src={heroImage} 
                alt="Hero background" 
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative container mx-auto px-4 py-24">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-bold mb-6 animate-fade-in">
                  Цифровые товары и услуги
                </h2>
                <p className="text-xl text-white/90 mb-8 animate-slide-up">
                  Читы, курсовые работы, VPN-сервисы. 
                  Быстро, безопасно, удобно.
                </p>
                <div className="flex items-center gap-6 animate-slide-up">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span>Безопасные платежи</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    <span>Качественный сервис</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Поддержка 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Все категории' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </section>

          {/* Features */}
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-12">Почему выбирают нас?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center shadow-card bg-gradient-card">
                  <CardHeader>
                    <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Безопасные платежи</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Интеграция с YooKassa обеспечивает максимальную безопасность ваших платежей
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card bg-gradient-card">
                  <CardHeader>
                    <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Мгновенная доставка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Все цифровые товары доставляются мгновенно после оплаты
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center shadow-card bg-gradient-card">
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Поддержка 24/7</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Наша служба поддержки готова помочь вам в любое время дня и ночи
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Self-Employed Info */}
          <section className="container mx-auto px-4 py-16">
            <SelfEmployedInfo />
          </section>
        </>
      )}

      {currentView === 'cart' && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentView('products')}>
              ← Продолжить покупки
            </Button>
          </div>
          
          <ShoppingCart
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={() => setCurrentView('checkout')}
          />
        </div>
      )}

      {currentView === 'checkout' && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Оформление заказа</h2>
            <p className="text-muted-foreground">Заполните данные для доставки и оплаты</p>
          </div>
          
          <CheckoutForm
            items={items}
            onSubmit={handleCheckout}
            onBack={() => setCurrentView('cart')}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-hero text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-bold">frostmarket</span>
              </div>
              <p className="text-white/80">
                Цифровые товары и услуги
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white">Читы</a></li>
                <li><a href="#" className="hover:text-white">Курсовые</a></li>
                <li><a href="#" className="hover:text-white">VPN-сервис</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="https://t.me/frostmarket" className="hover:text-white">Канал: @frostmarket</a></li>
                <li><a href="https://t.me/frostmarket_meneg" className="hover:text-white">Поддержка: @frostmarket_meneg</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Самозанятый</h4>
              <p className="text-white/80 text-sm">
                ИНН: 123456789012<br />
                Статус: Самозанятый<br />
                Чеки формируются автоматически
              </p>
            </div>
          </div>

          <Separator className="my-8 bg-white/20" />
          
          <div className="text-center text-white/60">
            <p>&copy; 2025 frostmarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
