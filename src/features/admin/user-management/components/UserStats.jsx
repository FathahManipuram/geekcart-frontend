import React from 'react'

const UserStats = ({total, active, admins}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>Total: {total}</div>
      <div>Active: {active}</div>
      <div>Admins: {admins}</div>
    </div>
  )
}

export default UserStats
