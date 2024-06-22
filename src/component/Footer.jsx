import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const avatarSrc = "https://avatars.githubusercontent.com/u/121891572?s=400&u=97db5434e6c1d56cc108dd03669f20d6052ea07b&v=4";

const Footer = () => {
  return <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"} minH={"45"} px={"16"} p={["16", "8"]}>

    <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>

            <Text fontWeight={"bold"}>About US</Text>

            <Text 
                fontSize={"ms"} 
                letterSpacing={"widest"} 
                textAlign={["center", "left"]}
            >
                We are the best crypto trading app in India, we provide our guidance at a very low price.
            </Text>

        </VStack>
        <VStack>
            <Avatar boxSize={"28"} mt={["4", "0"]} src={avatarSrc} />
            <Text>Our Founder</Text>
        </VStack>
    </Stack>
  </Box>
}

export default Footer