import React from 'react'
import useToken from '../../hooks/token'
import Account from '../../types/Account'
import {
  Card,
  Typography,
  makeStyles,
  Theme,
  Grid,
  Tooltip
} from '@material-ui/core'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import cl from '../../functions/classList'

const padding = 16

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding,
    position: 'relative',
    marginBottom: 16
  },
  token: {
    textAlign: 'center',
    userSelect: 'all',
    '&::selection': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  },
  icons: {
    position: 'absolute',
    right: padding,
    bottom: padding / 2
  },
  icon: {
    opacity: 0.25,
    marginLeft: 8
  },
  favToggle: {
    cursor: 'pointer'
  }
}))

const TokenCard: React.FC<Account> = ({
  secret,
  encrypt,
  name,
  sync,
  description,
  user,
  labels
}) => {
  const token = useToken(secret)

  const styles = useStyles()

  return (
    <Card className={styles.card}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="caption">{user || '‌‌ '}</Typography>
          <Typography variant="body2">{description || '‌‌ '}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" className={styles.token}>
            {token
              ?.split('')
              .slice(0, 3)
              .join('')}{' '}
            {token
              ?.split('')
              .slice(3, 6)
              .join('')}
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.icons}>
        {sync && (
          <Tooltip title="Synced with cloud">
            <CloudDoneIcon className={styles.icon} />
          </Tooltip>
        )}
        {encrypt && (
          <Tooltip title="Encrypted">
            <HttpsRoundedIcon className={styles.icon} />
          </Tooltip>
        )}
        <Tooltip
          title={
            labels.includes('fav') ? 'Remove favourite' : 'Mark as favourite'
          }
        >
          {labels.includes('fav') ? (
            <StarRoundedIcon className={cl([styles.favToggle, styles.icon])} />
          ) : (
            <StarBorderRoundedIcon
              className={cl([styles.favToggle, styles.icon])}
            />
          )}
        </Tooltip>
      </div>
    </Card>
  )
}

export default TokenCard
