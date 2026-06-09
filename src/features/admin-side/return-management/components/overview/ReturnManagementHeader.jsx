import Header from '@/shared/components/Header'
import React from 'react'

const ReturnManagementHeader = () => {
  return (
	<div>
	  <Header title="Return Management"/>
	  <p className="text-muted-foreground">
          Manage customer return requests.
        </p>
	</div>
  )
}

export default ReturnManagementHeader
