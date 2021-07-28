import { useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { CardStyled, ContainerStyled } from './styled'
import { useSoundFX } from '../../hooks'
import { GET_DROPPED_ITEMS } from '../../operations/queries/getItems'

export default function Header () {
  // const router = useRouter()
  const usedItemsQuery = useQuery(GET_DROPPED_ITEMS)
  const usedItems = usedItemsQuery?.data?.usedItems

  const { play } = useSoundFX('battleVictoryMusic')

  useEffect(() => {
    play()
  }, [])

  return (
    <ContainerStyled>
      You Win!
      {usedItems.map((item) => (
        <CardStyled key={item.name}>
          {item.name} X {item.drops}
        </CardStyled>
      ))}
      <CardStyled>Show Data!!</CardStyled>
    </ContainerStyled>
  )
}
