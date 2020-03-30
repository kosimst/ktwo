import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  createStyles,
  makeStyles,
  Theme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded'
import React, { lazy, Suspense, useState } from 'react'
import defaultLabels from '../constants/default-labels'
import Fab from '@material-ui/core/Fab'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import CogRoundedIcon from '@material-ui/icons/SettingsRounded'
import TokenCard from '../components/token-card'
import useSavedAccounts from '../hooks/saved-accounts'
import theme from '../config/theme'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    fab: {
      position: 'absolute',
      right: theme.spacing(3),
      bottom: theme.spacing(3)
    },
    settings: {
      position: 'absolute',
      bottom: 0
    }
  })
)

export default function ClippedDrawer() {
  const classes = useStyles()

  const userLabels = ['Phone']

  const [savedAccounts] = useSavedAccounts()

  const [selectedLabel, setSelectedLabel] = useState<string>('all')
  const setSelectedLabelTo = (id: string) => () => setSelectedLabel(id)

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              My Vault
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={setSelectedLabelTo('all')}>
              <ListItemIcon>
                <VpnKeyRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="All Tokens"
                secondary={`${Math.floor(Math.random() * 6)} Tokens`}
              />
            </ListItem>
            <ListItem button onClick={setSelectedLabelTo('fav')}>
              <ListItemIcon>
                <StarBorderRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Favourites"
                secondary={`${Math.floor(Math.random() * 6)} Tokens`}
              />
            </ListItem>
          </List>
          <Divider />
          {defaultLabels.map(({ icon, id, name }) => {
            const Icon = lazy(() => import(`@material-ui/icons/${icon}Rounded`))

            return (
              <ListItem button key={id} onClick={setSelectedLabelTo(id)}>
                <ListItemIcon>
                  <Suspense fallback={<LabelOutlinedIcon />}>
                    <Icon />
                  </Suspense>
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  secondary={`${Math.floor(Math.random() * 6 + 1)} Tokens`}
                />
              </ListItem>
            )
          })}
          {userLabels.length ? <Divider /> : null}
          {userLabels.map(label => (
            <ListItem button key={label} onClick={setSelectedLabelTo(label)}>
              <ListItemIcon>
                <LabelOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={label}
                secondary={`${Math.floor(Math.random() * 6 + 1)} Tokens`}
              />
            </ListItem>
          ))}
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <AddRoundedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Add new label"
              secondary="Create custom label"
            />
          </ListItem>

          <ListItem button className={classes.settings}>
            <ListItemIcon>
              <CogRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" secondary="Customize your vault" />
          </ListItem>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Fab color="primary" className={classes.fab}>
            <AddRoundedIcon />
          </Fab>

          {savedAccounts
            .filter(
              ({ labels }) =>
                selectedLabel === 'all' || labels.includes(selectedLabel)
            )
            .map(props => (
              <TokenCard {...props} />
            ))}
        </main>
      </div>
    </MuiThemeProvider>
  )
}
