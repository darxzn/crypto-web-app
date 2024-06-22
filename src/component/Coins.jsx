import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard'

const Coin = () => {

  const [coins, setCoins] = useState([])
  const [loading, setLoding] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"
  
  const changePage = (page) => {
    setPage(page)
    setLoding(true)
  }

    const btns = new Array(132).fill(1)

  useEffect(()=>{

    const fetchCoin = async () => {

      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)                   
        setLoding(false)
      } catch (error) {
        setError(true)
        setLoding(false)
      }

    } 

    fetchCoin()

  }, [currency, page])

  if(error) return <ErrorComponent message={'Error While Fetching Coins'}/>
  
  return (
    <Container
      maxW={'container.xl'}
    >
     
      {loading ? <Loader /> : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={"4"}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              coins.map((i)=> (
                <CoinCard 
                  id={i.id}
                  name={i.name} 
                  price={i.current_price}
                  img={i.image} 
                  symbol={i.symbol} 
                  key={i.id}
                  currencySymbol={currencySymbol}
                />))
            }
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={8}>
            {
              btns.map((item, index)=>(
                <Button 
                  key={index}
                  bgColor={"blackAlpha.900"} 
                  color={"white"} 
                  onClick={()=>changePage(index + 1)}
                >
                  {index+1}
                </Button>
              ))
            }
          </HStack>
        </>
      )}

    </Container>
  )
}




export default Coin