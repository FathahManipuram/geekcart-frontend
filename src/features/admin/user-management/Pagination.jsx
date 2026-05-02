import React from 'react'
import { useAdminStore } from '../auth/admin.store'
import { Button } from '@/shared/components/ui/button'

const Pagination = () => {
	{pageXOffset, total, limit, fetchUser}= useAdminStore()
	const TotalPages= MathCeil(totlal/limit)
	
  return (
	<div>
	  <Button onClick={()=> setPage(page-1)}>Prev</Button>
	  <span>Page</span>
	  <Button onClick={()=> setPage(page+1)}>Next</Button>
	</div>
  )
}

export default Pagination
