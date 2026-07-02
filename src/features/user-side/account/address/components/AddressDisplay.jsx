import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard';
import { Button } from '@/shared/components/ui/button';
import Modal from '@/shared/components/Modal';
import AddressForm from './AddressForm';
import { useAccountStore } from '../../store/account.store';
import EmptyAddress from './EmptyAddress';
import { Plus } from 'lucide-react';

const AddressDisplay = () => {
const [addressModalOpen, setAddressModalOpen]= useState(false)
const addresses= useAccountStore((state)=> state.addresses)
const {fetchAddresses}= useAccountStore()

useEffect(()=>{
  fetchAddresses()
},[fetchAddresses])

  return (
    <>
      <div className="flex flex-row items center justify-between mb-6">
        <p className="text-xl font-bold">Saved Address</p>
        <Button onClick={() => setAddressModalOpen(true)}>
          <Plus/>
          Add New Address
        </Button>
      </div>
      {addresses.length === 0 ? (
        <EmptyAddress />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </div>
      )}

      <Modal
        open={addressModalOpen}
        onOpenChange={setAddressModalOpen}
        title="Add New Address"
        className="w-full"
      >
        <AddressForm onClose={() => setAddressModalOpen(false)} />
      </Modal>
    </>
  );
};

export default AddressDisplay
