import {Tabs, TabsContent, TabsTrigger, TabsList} from "../../components/Tabs";
import DataTable from "../../components/DataTable";
import {Navbar} from "../../components/Navbar";
import React from "react";

export default function AdminPage() {
  return (
      <>
          <Navbar/>
          <p className="text-5xl font-extrabold py-8 ">Панель управления</p>
          <Tabs defaultValue="account" className="container">
              <TabsList>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                  <DataTable dataType="products"/>
              </TabsContent>
              <TabsContent value="orders">
                  <DataTable dataType="orders"/>
              </TabsContent>
              <TabsContent value="categories">
                  <DataTable dataType="categories"/>
              </TabsContent>
          </Tabs>
      </>
  )
}
