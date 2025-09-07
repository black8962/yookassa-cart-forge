import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Shield, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  Settings,
  Key,
  Wallet,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

export default function YooKassaInfo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к магазину
          </Link>
          <h1 className="text-4xl font-bold mb-4">Интеграция с YooKassa</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Подробное руководство по подключению платежной системы YooKassa к вашему интернет-магазину
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What is YooKassa */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  Что такое YooKassa?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  YooKassa (ранее Яндекс.Касса) — это универсальная платежная система от Яндекса, 
                  которая позволяет принимать онлайн-платежи от клиентов различными способами.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-medium">Безопасность</h4>
                      <p className="text-sm text-muted-foreground">PCI DSS сертификация и защита данных</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-medium">Удобство</h4>
                      <p className="text-sm text-muted-foreground">Оплата с мобильных устройств</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-medium">Международные платежи</h4>
                      <p className="text-sm text-muted-foreground">Поддержка карт со всего мира</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Wallet className="h-5 w-5 text-success mt-1" />
                    <div>
                      <h4 className="font-medium">Множество способов</h4>
                      <p className="text-sm text-muted-foreground">Карты, кошельки, банки</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step by Step Integration */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-primary" />
                  Пошаговая интеграция
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <Badge className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">1</Badge>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Регистрация в YooKassa</h4>
                    <p className="text-muted-foreground">
                      Зарегистрируйтесь на сайте <a href="https://yookassa.ru" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">yookassa.ru</a> и пройдите верификацию
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>Документы:</strong> ИНН, ОГРН/ОГРНИП, уставные документы, банковские реквизиты
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 2 */}
                <div className="flex gap-4">
                  <Badge className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">2</Badge>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Получение API ключей</h4>
                    <p className="text-muted-foreground">
                      В личном кабинете YooKassa получите секретный ключ и shopId
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                      <p className="text-sm">
                        <strong>shopId:</strong> Идентификатор вашего магазина
                      </p>
                      <p className="text-sm">
                        <strong>Секретный ключ:</strong> Для авторизации API запросов
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 3 */}
                <div className="flex gap-4">
                  <Badge className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">3</Badge>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Настройка Edge Function</h4>
                    <p className="text-muted-foreground">
                      Создайте Supabase Edge Function для обработки платежей
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`// supabase/functions/create-payment/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { amount, orderId, description } = await req.json()
    
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': \`Basic \${btoa(Deno.env.get('YOOKASSA_SHOP_ID') + ':' + Deno.env.get('YOOKASSA_SECRET_KEY'))}\`,
        'Content-Type': 'application/json',
        'Idempotence-Key': crypto.randomUUID(),
      },
      body: JSON.stringify({
        amount: {
          value: amount,
          currency: 'RUB'
        },
        confirmation: {
          type: 'redirect',
          return_url: \`\${Deno.env.get('SITE_URL')}/success\`
        },
        description: description,
        metadata: {
          order_id: orderId
        }
      })
    })

    const payment = await response.json()
    
    return new Response(
      JSON.stringify(payment),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})`}
                      </pre>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 4 */}
                <div className="flex gap-4">
                  <Badge className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">4</Badge>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Добавление секретов в Supabase</h4>
                    <p className="text-muted-foreground">
                      Сохраните API ключи как секреты в Supabase
                    </p>
                    <div className="space-y-2">
                      <Badge variant="outline">YOOKASSA_SHOP_ID</Badge>
                      <Badge variant="outline">YOOKASSA_SECRET_KEY</Badge>
                      <Badge variant="outline">SITE_URL</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 5 */}
                <div className="flex gap-4">
                  <Badge className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">5</Badge>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Интеграция в приложение</h4>
                    <p className="text-muted-foreground">
                      Вызывайте Edge Function при оформлении заказа
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`const createPayment = async (orderData) => {
  const { data, error } = await supabase.functions.invoke('create-payment', {
    body: {
      amount: orderData.totalPrice.toFixed(2),
      orderId: orderData.id,
      description: \`Заказ №\${orderData.id}\`
    }
  })
  
  if (error) throw error
  
  // Перенаправление на страницу оплаты
  window.location.href = data.confirmation.confirmation_url
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Setup */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-6 w-6 text-primary" />
                  Настройка Webhook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Webhook позволяет получать уведомления об изменении статуса платежа
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">URL для webhook:</h4>
                  <code className="text-sm">https://[your-project].supabase.co/functions/v1/payment-webhook</code>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">События для отслеживания:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• payment.succeeded — успешная оплата</li>
                    <li>• payment.canceled — отмена платежа</li>
                    <li>• refund.succeeded — успешный возврат</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Способы оплаты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Банковские карты</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Яндекс Деньги</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Сбербанк Онлайн</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">QIWI Wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">WebMoney</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Альфа-Клик</span>
                </div>
              </CardContent>
            </Card>

            {/* Commission */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Комиссия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Банковские карты</span>
                    <span className="text-sm font-medium">2.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Электронные кошельки</span>
                    <span className="text-sm font-medium">3.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Интернет-банкинг</span>
                    <span className="text-sm font-medium">0.8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  * Точные тарифы зависят от вашего договора
                </p>
              </CardContent>
            </Card>

            {/* Useful Links */}
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Полезные ссылки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://yookassa.ru" target="_blank" rel="noopener noreferrer">
                    <Globe className="mr-2 h-4 w-4" />
                    Сайт YooKassa
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://yookassa.ru/docs/api" target="_blank" rel="noopener noreferrer">
                    <Key className="mr-2 h-4 w-4" />
                    API Документация
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://yookassa.ru/my" target="_blank" rel="noopener noreferrer">
                    <Settings className="mr-2 h-4 w-4" />
                    Личный кабинет
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}