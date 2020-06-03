import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import {
  black,
  blackTransparent2,
  fontFamily,
  gray,
  white,
} from '../../../../constants/variables'
import { GET_ITEMS } from '../../../../operations/queries/getItems'
import Targets from '../Targets'

const Items = ({ targeter }) => {
  const itemsQuery = useQuery(GET_ITEMS)
  const items = itemsQuery?.data?.items

  const [selectedItem, setSelectedItem] = useState('')
  const [typeOfAction, setTypeOfAction] = useState(false)

  const handleClick = (item) => {
    if (item.revive) {
      setTypeOfAction('revive')
    }
    if (item.damage) {
      setTypeOfAction('itemDamage')
    }
    if (item.restore) {
      setTypeOfAction('heal')
    }
    setSelectedItem(item)
  }

  const ItemsDisplay = () =>
    items.map(
      (item) =>
        item.amount > 0 && (
          <ActionStyled
            onClick={() => handleClick(item)}
            key={item.id}
            type="button"
            disabled={item.amount === 0}
          >
            <span style={{ textAlign: 'left' }}>{item.name}</span>
            <span>{item.amount}</span>
          </ActionStyled>
        )
    )

  const isMoreThanFive = () => items.length > 5

  return (
    <>
      <ItemsContainerStyled moreThanFive={isMoreThanFive()}>
        <ItemsDisplay />
      </ItemsContainerStyled>
      {typeOfAction && (
        <Targets targeter={targeter} typeOfAction={typeOfAction} item={selectedItem} sub />
      )}
    </>
  )
}

export const ActionStyled = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${white};
  font-family: ${fontFamily};
  font-size: 22pt;
  margin-bottom: -5px;
  margin-bottom: 4px;
  margin-top: 0px;
  outline: 0;
  padding: 0 0;
  text-shadow: 2px 1px ${(props) => (props.warn ? black : '#8a8a7b')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: blue; // just to show what is selected, change to a real color [TODO]
  }
  &:disabled {
    color: ${gray};
    text-shadow: 2px 1px ${black};
    &:hover {
      cursor: default;
    }
  }
`

const ItemsContainerStyled = styled.div`
  align-items: flex-start;
  background-color: ${blackTransparent2};
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  bottom: 40px;
  box-shadow: 3px 3px ${black}, -3px -3px ${black}, -3px 3px ${black}, 3px -3px ${black};
  color: ${white};
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: flex-start;
  left: 40px;
  min-width: 300px;
  overflow: auto;
  position: absolute;
  text-shadow: 2px 1px #8a8a7b;
  z-index: 1;
`

Items.propTypes = {
  targeter: PropTypes.object.isRequired,
}

export default Items
