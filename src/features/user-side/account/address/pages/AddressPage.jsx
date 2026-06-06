import React, { useEffect } from "react";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import AddressDisplay from "../components/AddressDisplay";
import { useAccountStore } from "../../store/account.store";

const AddressPage = () => {
  const fetchAddresses= useAccountStore((state)=> state.fetchAddresses)

  useEffect(()=>{
    fetchAddresses()
  }, [fetchAddresses])
  return (
    <div>
      <AddressDisplay
      />
    </div>
  );
};

export default AddressPage;
