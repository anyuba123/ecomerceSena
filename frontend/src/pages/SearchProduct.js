import React, { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("query", query.search)

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
  }, [query]);

  useEffect(() => {
    fetchProduct();
  }, [query, fetchProduct]);

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Cargando ...</p>
        )
      }

      <p className='text-lg font-semibold my-3'>Resultados de Búsqueda : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>Datos No Encontrados....</p>
        )
      }


      {
        data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )
      }

    </div>
  )
}

export default SearchProduct