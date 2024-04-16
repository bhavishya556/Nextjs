import React from 'react'

const profile = ({params}:any) => {
  return (
    <div>profile
      <h2>{params.id}</h2>
    </div>
  )
}

export default profile