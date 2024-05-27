
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs";
import DataTable from "../../components/DataTable";

export default function AdminPage() {
  return (
      <Tabs defaultValue="products" className=" w-full max-w-3xl px-4 ">
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <DataTable dataType="products" />
      </TabsContent>
      <TabsContent value="feedbacks">
        {/*<DataTable dataType="categories" />*/}
      </TabsContent>
      <TabsContent value="orders">
        {/*<DataTable dataType="orders" />*/}
      </TabsContent>
      <TabsContent value="comments">
        {/*<DataTable dataType="orders" />*/}
      </TabsContent>
      <TabsContent value="logs">
        {/*<DataTable dataType="orders" />*/}
      </TabsContent>

    </Tabs>

  )
}
