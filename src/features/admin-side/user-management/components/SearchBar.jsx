import React, { useEffect, useState } from 'react'
import SearchInput from '@/shared/components/SearchInput';
import { useUserManagementStore } from '../stores/userManagement.store';
import useDebounce from '@/shared/hooks/useDebounce';

const SearchBar = () => {

const {search, fetchUsers, status,}= useUserManagementStore();
const [searchTerm, setSearchTerm]= useState(search)
const debouncedSearch= useDebounce(searchTerm, 500)


useEffect(()=>{
  fetchUsers({
    page: 1,
    limit: 5,
    search: debouncedSearch,
    status,
  });
}, [debouncedSearch, fetchUsers, status])

const handleClear= ()=>{
  setSearchTerm("")
}


  return (

    <SearchInput
    value={searchTerm}
    onChange={setSearchTerm}
    onClear={handleClear}
    placeholder='Search by name or email'
    /> 
  );
}

export default SearchBar
