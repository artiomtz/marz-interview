import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { ProductList } from "../../components/interfaces";
import { getProductData } from "../ApiHelper";
import PageWrapper from "../PageWrapper";

const DATA_STATES = {
  waiting: "WAITING",
  loaded: "LOADED",
  error: "ERROR",
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({ Products: [] } as ProductList);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productsData, errorOccured } = await getProductData();
    setData(productsData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="products-container"
      >
        {data.Products.filter(
          (product) => product.ProductStatus == "Active"
        ).map((product) => (
          <div
            key={product.ProductID}
            className="m-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="rounded-t-lg"
              src={product.ProductPhotoURL}
              alt="Image failed to load"
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.ProductName}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                ID: {product.ProductID}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
