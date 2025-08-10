"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import OrdersSummary from "./orders-summary";
import { Badge } from "@/components/ui/badge";
import type { orderTable } from "@/db/schema";

interface OrderProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      quantity: number;
      priceInCents: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrderProps) => {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col gap-2">
                    {order.status === "paid" && <Badge >Pago</Badge>}
                    {order.status === "pending" && <Badge variant="outline">Pagamento Pendente</Badge>}
                    {order.status === "canceled" && <Badge variant="destructive">Cancelado</Badge>}
                    <p>
                      Pedido feito em{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(order.createdAt).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <OrdersSummary
                      subtotalInCents={order.totalPriceInCents}
                      totalInCents={order.totalPriceInCents}
                      products={order.items.map((item) => ({
                        id: item.id,
                        imageUrl: item.imageUrl,
                        name: item.productName,
                        variantName: item.productVariantName,
                        quantity: item.quantity,
                        priceInCents: item.priceInCents,
                      }))}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
