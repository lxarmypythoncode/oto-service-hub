
import React, { useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Check, Search, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock inventory data
const mockInventoryItems = [
  {
    id: "part-001",
    name: "Engine Oil Filter",
    category: "Filters",
    quantity: 15,
    minStock: 5,
    price: 45000,
    location: "Rack A-1",
    lastRestocked: "2025-04-25",
  },
  {
    id: "part-002",
    name: "Brake Pad Set (Front)",
    category: "Brakes",
    quantity: 3,
    minStock: 6,
    price: 320000,
    location: "Rack B-3",
    lastRestocked: "2025-04-20",
  },
  {
    id: "part-003",
    name: "Air Filter",
    category: "Filters",
    quantity: 8,
    minStock: 4,
    price: 75000,
    location: "Rack A-2",
    lastRestocked: "2025-04-28",
  },
  {
    id: "part-004",
    name: "Spark Plugs (Set of 4)",
    category: "Ignition",
    quantity: 7,
    minStock: 5,
    price: 160000,
    location: "Rack C-1",
    lastRestocked: "2025-04-15",
  },
  {
    id: "part-005",
    name: "AC Compressor",
    category: "Air Conditioning",
    quantity: 1,
    minStock: 2,
    price: 1500000,
    location: "Rack D-4",
    lastRestocked: "2025-03-10",
  },
  {
    id: "part-006",
    name: "Timing Belt Kit",
    category: "Engine",
    quantity: 0,
    minStock: 2,
    price: 850000,
    location: "Rack C-3",
    lastRestocked: "2025-03-05",
    onOrder: true,
  },
];

const InventoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(mockInventoryItems);
  
  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const lowStockItems = filteredItems.filter(item => item.quantity < item.minStock);
  const requestOrder = (partId: string) => {
    setInventory(inventory.map(item => 
      item.id === partId ? { ...item, onOrder: true } : item
    ));
    
    toast({
      title: "Order requested",
      description: `Restock request has been sent for part ${partId}`,
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Request Parts
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="low-stock">
              Low Stock <Badge variant="outline" className="ml-2 bg-red-100">{lowStockItems.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-2 font-medium">Part Name</th>
                    <th className="text-left p-2 font-medium">Category</th>
                    <th className="text-left p-2 font-medium">Quantity</th>
                    <th className="text-left p-2 font-medium">Price</th>
                    <th className="text-left p-2 font-medium">Location</th>
                    <th className="text-left p-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/30">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <span className={
                            item.quantity <= 0 ? "text-red-500" :
                            item.quantity < item.minStock ? "text-amber-500" : ""
                          }>
                            {item.quantity}
                          </span>
                          {item.quantity < item.minStock && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-amber-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-2">{formatPrice(item.price)}</td>
                      <td className="p-2">{item.location}</td>
                      <td className="p-2">
                        {item.quantity <= 0 ? (
                          item.onOrder ? (
                            <Badge variant="outline" className="bg-blue-100">On Order</Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => requestOrder(item.id)}
                              className="h-7 text-xs"
                            >
                              Request Restock
                            </Button>
                          )
                        ) : item.quantity < item.minStock ? (
                          <Badge variant="outline" className="bg-amber-100">Low Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100">In Stock</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredItems.length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No inventory items found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="low-stock" className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-2 font-medium">Part Name</th>
                    <th className="text-left p-2 font-medium">Category</th>
                    <th className="text-left p-2 font-medium">Quantity</th>
                    <th className="text-left p-2 font-medium">Min Stock</th>
                    <th className="text-left p-2 font-medium">Location</th>
                    <th className="text-left p-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/30">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">
                        <span className={item.quantity <= 0 ? "text-red-500" : "text-amber-500"}>
                          {item.quantity}
                        </span>
                      </td>
                      <td className="p-2">{item.minStock}</td>
                      <td className="p-2">{item.location}</td>
                      <td className="p-2">
                        {item.onOrder ? (
                          <Badge variant="outline" className="bg-blue-100">On Order</Badge>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => requestOrder(item.id)}
                            className="h-7 text-xs"
                          >
                            Request Restock
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {lowStockItems.length === 0 && (
                <div className="text-center p-8 flex flex-col items-center">
                  <Check className="h-8 w-8 text-green-500 mb-2" />
                  <p className="text-muted-foreground">All items are sufficiently stocked</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {inventory.length} total items in inventory | {lowStockItems.length} items low on stock
        </p>
      </CardFooter>
    </>
  );
};

export default InventoryManagement;
