import React, { useEffect, useState } from 'react'
import OfferManagementHeader from '../components/overview/OfferMangementHeader';
import Pagination from '@/shared/components/Pagination';
import OfferStatsCards from '../components/overview/OfferStatsCards';
import OfferFilters from '../components/overview/OfferFilters';
import OfferTable from '../components/overview/OfferTable';
import { useOfferStore } from '../store/offer.store';
import useDebounce from '@/shared/hooks/useDebounce';

const OfferManagementPage = () => {

	const fetchOffers = useOfferStore((state) => state.fetchOffers);
	const offers= useOfferStore((state)=> state.offers)
	const loading = useOfferStore((state)=> state.loading)
	const pagination= useOfferStore((state)=> state.pagination)

	const [page, setPage]=useState(1)
	const [search, setSearch]= useState("")
	const [status, setStatus]= useState("ALL")
	const [offerType, setOfferType]= useState("ALL")

	const debouncedValue= useDebounce(search, 500)

	useEffect(()=>{
		fetchOffers({
			page,
			limit: 5,
			search: debouncedValue,
			status,
			offerType
		})
	},[page, debouncedValue, status, offerType])


	console.log("offers", offers)
  return (
    <div className="space-y-6">
      <OfferManagementHeader />

    <OfferStatsCards />

      <OfferFilters search={search} onSearchChange={setSearch} status={status} onStatusChange={setStatus} offerType={offerType} onTypeChange={setOfferType}/>

      <OfferTable offers={offers} loading={loading}/> 

      <Pagination currentPage={pagination?.currentPage || 1} totalPages={pagination?.totalPages || 1} onPageChange={setPage}/>
    </div>
  );
}

export default OfferManagementPage
