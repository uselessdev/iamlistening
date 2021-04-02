import { Grid, Stack, Text, Image, Box, Heading, Button, Link, Skeleton } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { useMusic } from './useMusic'

function App() {
  const { music, status } = useMusic()

  if (status === 'error') {
    return (
      <Grid placeItems="center" w="100%" h="100vh" bgColor="green.50">
        <Text color="green.400" fontWeight="bold">what i'm listening?</Text>
      </Grid>
    )
  }

  return (
    <>
      <Helmet>
        <title>{music?.name} - {music?.artist}</title>
        <link rel="icon" href={music?.cover} />
        <meta property="og:title" content={music?.name} />
        <meta property="og:description" content={music?.artist} />
        <meta property="og:image" content={music?.background} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content={music?.background} />
        <meta name="twitter:title" content={music?.name} />
        <meta name="twitter:description" content={music?.artist} />
      </Helmet>

      <Grid w="100%" h="100vh" background={`url(${music?.background})`} backgroundRepeat="no-repeat" backgroundPosition="center" backgroundSize="cover">
        <Grid placeItems="center" w="100vw" h="100vh" sx={{ backdropFilter: 'blur(1.5rem)' }}>
          <Stack alignItems="center" direction={['column', 'column', 'row']} spacing={8}>
            <Skeleton w="300px" h="300px" isLoaded={status !== 'loading'}>
              <Image src={music?.cover} alt={music?.name} borderRadius="lg" boxShadow="2xl" />
            </Skeleton>

            <Box textAlign={["center", 'center', 'initial']}>
              <Skeleton isLoaded={status !== 'loading'}>
                <Heading fontSize={['4xl', "6xl"]} color="white">{music?.name}</Heading>
              </Skeleton>

              <Skeleton isLoaded={status !== 'loading'}>
                <Text fontSize="lg" color="white">from {music?.name}</Text>
              </Skeleton>

              <Button mt={4} as={Link} href={music?.url}>listen on spotify</Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default App
