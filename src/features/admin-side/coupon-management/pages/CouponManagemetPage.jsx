import { useEffect, useState } from "react";
import CouponFilters from "../components/overview/CouponFilters";
import CouponStatsCards from "../components/overview/CouponStatsCards";
import CouponTable from "../components/overview/CouponTable";
import CouponManagementHeader from "../components/overview/CouponManagementHeader";
import { useCouponStore } from "../store/coupon.store";
import useDebounce from "@/shared/hooks/useDebounce";
import Pagination from "@/shared/components/Pagination";

const CouponManagementPage = () => {
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedValue = useDebounce(search, 500);
  const fetchCoupons = useCouponStore((state) => state.fetchCoupons);
  const coupons = useCouponStore((state) => state.coupons);
  const loading = useCouponStore((state) => state.loading);
  const pagination = useCouponStore((state) => state.pagination);
  const stats = useCouponStore((state) => state.stats);

  useEffect(() => {
    fetchCoupons({
      page,
      limit: 5,
      status,
      type,
      search: debouncedValue,
    });
  }, [type, status, page, debouncedValue, fetchCoupons]);

  return (
    <div className="space-y-6">
      <CouponManagementHeader />

      <CouponStatsCards stats={stats} />

      <CouponFilters
        status={status}
        type={type}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onTypeChange={(value) => {
          setType(value);
          setPage(1);
        }}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <CouponTable coupons={coupons} loading={loading} />
      <Pagination
        currentPage={Number(pagination?.currentPage) || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default CouponManagementPage;
