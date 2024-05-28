import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div>  
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpods"} />
      <HorizontalCardProduct category={"watches"} heading={"Relojes Populares"} />


      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Ratones"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisores"} />
      <VerticalCardProduct category={"camera"} heading={"Camara"} />
      <VerticalCardProduct category={"earphones"} heading={"Audifonos"} />
      <VerticalCardProduct category={"speakers"} heading={"Altavocs"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigeradores"} />
      <VerticalCardProduct category={"trimmers"} heading={"Cortadoras"} />


  </div>
)
}

export default Home
