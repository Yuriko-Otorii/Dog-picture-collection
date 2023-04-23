import React from 'react'

type Props = {
    title: string;
}


const Header = ({title}: Props) => {
  return (
    <>
        <h2 style={{ margin: "1rem auto" }}>{title}</h2>
    </>
  )
}

export default Header