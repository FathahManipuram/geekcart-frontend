import { useCallback, useEffect, useState } from "react";

import Pagination from "@/shared/components/Pagination";
import useDebounce from "@/shared/hooks/useDebounce";

import SalesReportFilters from "../components/SalesReportFilters";
import SalesSummaryCards from "../components/SalesSummaryCards";
import SalesReportTable from "../components/SalesReportTable";

import { useSalesReportStore } from "../store/salesReport.store";
import Header from "@/shared/components/Header";

const DEFAULT_FILTERS = {
  search: "",
  type: "yearly",
  startDate: "",
  endDate: "",
};

const PAGE_SIZE = 10;

const SalesReportPage = () => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(filters.search, 500);

  const { loading, summary, salesReport, pagination, getSalesReport } =
    useSalesReportStore();

  const downloadSalesExcel = useSalesReportStore(
    (state) => state.downloadSalesExcel,
  );

   const downloadSalesPdf = useSalesReportStore(
     (state) => state.downloadSalesPdf,
   );


 const fetchReport = useCallback(
   (pageNumber, currentFilters) => {
    console.log("rendered");
     getSalesReport({
       page: pageNumber,
       limit: PAGE_SIZE,
       ...currentFilters,
     });
   },
   [getSalesReport],
 );


useEffect(() => {
  fetchReport(page, {
    ...filters,
    search: debouncedSearch,
  });
}, [page]);

 
useEffect(() => {
  
  if (page !== 1) {
    setPage(1);
  }

  fetchReport(1, {
    ...filters,
    search: debouncedSearch,
  });
}, [debouncedSearch]);

   const handleApply = () => {
     if (
       filters.type === "custom" &&
       (!filters.startDate || !filters.endDate)
     ) {
       return;
     }

     setPage(1);

     fetchReport(1, {
       ...filters,
       search: debouncedSearch,
     });
   };

  useEffect(() => {
    if (filters.type === "custom") return;

    setPage(1);

    fetchReport(1, filters);
  }, [filters.type]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    fetchReport(1, DEFAULT_FILTERS);
  };


const handleExcel = () => {
  downloadSalesExcel({
    ...filters,
    search: debouncedSearch,
  });
};

const handlePdf = () => {
  downloadSalesPdf({
    ...filters,
    search: debouncedSearch,
  });
};
  return (
    <div className="space-y-6">
      <Header title="Sales Report"/>
      <SalesSummaryCards summary={summary} loading={loading} />

      <SalesReportFilters
        filters={filters}
        onChange={setFilters}
        onApply={handleApply}
        onReset={handleReset}
        onDownloadPdf={handlePdf}
        onDownloadExcel={handleExcel}
      />

      <SalesReportTable loading={loading} orders={salesReport} />

      <Pagination
        currentPage={pagination?.currentPage ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SalesReportPage;
