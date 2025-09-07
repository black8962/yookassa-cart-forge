import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, User, Hash, Building } from "lucide-react";

export function SelfEmployedInfo() {
  return (
    <Card className="shadow-card bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <FileText className="h-5 w-5" />
          Информация о самозанятом
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Исполнитель</p>
                <p className="font-medium">Иванов Иван Иванович</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">ИНН</p>
                <p className="font-medium font-mono">123456789012</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Статус</p>
                <Badge variant="success" className="font-medium">
                  Самозанятый
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Чеки</p>
                <p className="font-medium">Формируются автоматически</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Важно:</strong> В соответствии с законодательством РФ о самозанятых, 
            после оплаты заказа вам будет автоматически выдан чек через приложение "Мой налог". 
            Налог с продаж составляет 4% для физических лиц и 6% для юридических лиц.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}