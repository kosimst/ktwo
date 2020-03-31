import { Portal, Tooltip } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined'
import CogRoundedIcon from '@material-ui/icons/SettingsRounded'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded'
import React, { lazy, Suspense, useState } from 'react'
import AccountDialog from '../components/account-dialog'
import TokenCardList from '../components/token-card-list'
import theme from '../config/theme'
import defaultLabels from '../constants/default-labels'
import useSavedAccounts from '../hooks/saved-accounts'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    fab: {
      position: 'absolute',
      right: theme.spacing(3),
      bottom: theme.spacing(3),
    },
    settings: {
      position: 'absolute',
      bottom: 0,
    },
  }),
)

export default function ClippedDrawer() {
  const classes = useStyles()

  const userLabels = ['Phone']

  const [savedAccounts, setSavedAccount] = useSavedAccounts()

  const [selectedLabel, setSelectedLabel] = useState<string>('all')
  const setSelectedLabelTo = (id: string) => () => setSelectedLabel(id)

  const [dialogOpened, setDialogOpened] = useState<boolean>(false)

  return (
    <MuiThemeProvider theme={theme}>
      <Portal>
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
              paper: classes.drawerPaper,
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
              const Icon = lazy(() =>
                import(`@material-ui/icons/${icon}Rounded`),
              )

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
            {userLabels.map((label) => (
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
              <ListItemText
                primary="Settings"
                secondary="Customize your vault"
              />
            </ListItem>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Tooltip title="Add new account">
              <Fab
                color="primary"
                className={classes.fab}
                onClick={() => setDialogOpened(true)}
              >
                <AddRoundedIcon />
              </Fab>
            </Tooltip>

            <TokenCardList tokens={savedAccounts} label={selectedLabel} />
          </main>

          <AccountDialog
            open={dialogOpened}
            onClose={() => setDialogOpened(false)}
            onSave={() => setDialogOpened(false)}
          />
        </div>
      </Portal>
    </MuiThemeProvider>
  )
}
