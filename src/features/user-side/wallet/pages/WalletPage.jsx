import { useEffect, useState } from "react";
import WalletBalanceCard from "../components/WalletBalanceCard";
import WalletFilters from "../components/WalletFilters";
import WalletSummaryCard from "../components/WalletSummaryCard";
import WalletTransactionTable from "../components/WalletTransactionTable";
import { useWalletStore } from "../store/wallet.store";
import useDebounce from "@/shared/hooks/useDebounce";
import Pagination from "@/shared/components/Pagination";



const WalletPage = () => {

const fetchWallet= useWalletStore((state)=> state.fetchWallet)
const fetchTransactions= useWalletStore((state)=> state.fetchTransactions)
const transactions= useWalletStore((state)=> state.transactions)
const wallet= useWalletStore((state)=> state.wallet)
const pagination= useWalletStore((state)=> state.pagination)

const [type, setType]= useState("ALL")
const [search, setSearch]= useState("")
const [page, setPage]= useState(1)
const debouncedvalue= useDebounce(search, 500)


  useEffect(() => {
    fetchWallet();
    fetchTransactions({
      page,
      limit: 5,
      type,
      search: debouncedvalue
    });
  }, [page, type, debouncedvalue])

  return (
    <div className="space-y-6 p-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WalletBalanceCard
            fetchWallet={fetchWallet}
            fetchTransactions={fetchTransactions}
          />
        </div>

        <div>
          <WalletSummaryCard wallet={wallet} transactions={transactions} />
        </div>
      </div>

      <WalletFilters
        type={type}
        onTypeChange={setType}
        search={search}
        onSearchChange={setSearch}
      />

      <WalletTransactionTable transactions={transactions} />
      <Pagination
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default WalletPage;
