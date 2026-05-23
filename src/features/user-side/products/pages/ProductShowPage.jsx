import React from 'react'
import { useParams } from 'react-router-dom'

const ProductShowPage = () => {
	const {slug}= useParams()
  return (
	<div>
	  Product show
	</div>
  )
}

export default ProductShowPage
