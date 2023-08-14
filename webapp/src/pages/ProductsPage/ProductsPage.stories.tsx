import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import { PRODUCTS_URL } from "../ApiHelper";

export default {
  title: "Products Page",
  component: ProductsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: "GET",
      status: 200,
      response: {
        data: [
          {
            ProductID: 1,
            ProductName: "Hat",
            ProductPhotoURL:
              "https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426995_1280.jpg",
            ProductStatus: "Active",
          },
          {
            ProductID: 2,
            ProductName: "Shoes",
            ProductPhotoURL:
              "https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426995_1280.jpg",
            ProductStatus: "Active",
          },
          {
            ProductID: 3,
            ProductName: "Pants",
            ProductPhotoURL:
              "https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426995_1280.jpg",
            ProductStatus: "Active",
          },
          {
            ProductID: 4,
            ProductName: "Shirt",
            ProductPhotoURL:
              "https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426995_1280.jpg",
            ProductStatus: "InActive",
          },
          {
            ProductID: 5,
            ProductName: "Coat",
            ProductPhotoURL:
              "https://cdn.pixabay.com/photo/2014/08/25/09/26/monster-426995_1280.jpg",
            ProductStatus: "InActive",
          },
        ],
        message: "",
      },
    },
  ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: "GET",
      status: 200,
      response: {
        data: [],
        message: "",
      },
    },
  ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: "GET",
      status: 500,
      response: {
        data: [],
        message: "Error",
      },
    },
  ],
};
