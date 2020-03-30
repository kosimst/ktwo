import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const FirstStep: React.FC = () => {
  return (
    <Container>
      <Typography variant="h3">Hello!</Typography>
      <Typography variant="body1">
        Welcome to ktwo, your new 2FA-Token Generator. You are just a few steps
        away from beginning.
      </Typography>
    </Container>
  )
}

export default FirstStep
