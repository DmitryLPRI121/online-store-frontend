
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs";
import PanelProducts from "../../components/AdminPanel/panelProducts";
import PanelOrders from "../../components/AdminPanel/panelOrders";
import PanelFeedbacks from "../../components/AdminPanel/panelFeedbacks";
import PanelComments from "../../components/AdminPanel/panelComments";
import Logs from "../../components/AdminPanel/Logs";

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
          <PanelProducts/>
      </TabsContent>
      <TabsContent value="feedbacks">
          <PanelFeedbacks/>
      </TabsContent>
      <TabsContent value="orders">
          <PanelOrders/>
      </TabsContent>
      <TabsContent value="comments">
          <PanelComments/>
      </TabsContent>
      <TabsContent value="logs">
          <Logs/>
      </TabsContent>

    </Tabs>

  )
}
