import React, { useEffect } from "react";
import HomeBanner from "../components/HomeBanner";
import CategoryCollection from "../components/CategoryCollection";
import ProductCollection from "../components/ProductCollection";
import { useHomeStore } from "../store/home.store";
import HomeOffersSection from "../components/offers/HomeOffersSection";
import Loader from "@/shared/components/Loader";

const HomePage = () => {
  const { categories, newDrops, offers, fetchHomeData, loading } =
    useHomeStore();

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <HomeBanner loading={loading} />
      <CategoryCollection subcategories={categories} loading={loading} />
      <HomeOffersSection offers={offers} loading={loading} />
      <ProductCollection products={newDrops} loading={loading} />
    </div>
  );
};

export default HomePage;
