import Collapse from '@material-ui/core/Collapse'
import React from 'react'
import { animated, useTrail } from 'react-spring'
import Account from '../../types/Account'
import TokenCard from '../token-card'

interface Props {
  tokens: Account[]
  label: string
}

const config = {
  tension: 250,
}

const TokenCardList: React.FC<Props> = ({ tokens, label }) => {
  const trail = useTrail(tokens.length, {
    config,
    from: {
      opacity: 0,
    },
    opacity: 1,
  })

  return (
    <>
      {trail.map((style, i) => (
        <animated.div key={tokens[i].secret} style={style}>
          <Collapse in={!tokens[i].labels.includes(label)}>
            <TokenCard {...tokens[i]} />
          </Collapse>
        </animated.div>
      ))}
    </>
  )
}

export default TokenCardList
