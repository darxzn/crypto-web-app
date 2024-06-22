import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import { transform } from 'framer-motion'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([])
  const [loading, setLoding] = useState(true)
  const [error, setError] = useState(false)
  
  useEffect(()=>{

    const fetchExchanges = async () => {

      try {
        const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoding(false)
      } catch (error) {
        setError(true)
        setLoding(false)
      }

    } 

    fetchExchanges()

  }, [])

  if(error) return <ErrorComponent message={'Error While Fetching Exchanges'}/>
  
  return (
    <Container
      maxW={'container.xl'}
    >
     
      {loading ? <Loader /> : (
        <>
          <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
            {
              exchanges.map((i)=> <ExchangeCards name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>)
            }
          </HStack>
        </>
      )}

    </Container>
  )
}

const ExchangeCards = ({name, img, rank, url}) => (
  <a href={url} target={'blank'}>
    <VStack
      w={52}
      shadow={'lg'}
      p={8}
      borderRadius={'lg'}
      transition={'all 0.3s'}
      m={4}
      css={{
        "&:hover":{
          transform: "scale(1.1)"
        }
      }}
    >
      <Image src={img} h={'10'} w={'10'} objectFit={"contain"} alt={"Exchange"}/>
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
)

export default Exchanges