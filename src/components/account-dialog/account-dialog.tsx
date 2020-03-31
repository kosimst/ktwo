import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import Account from '../../types/Account'

interface Props {
  account?: Account
  open: boolean
  onClose: () => void
  onSave: (newAccount: Account) => void
}

const AccountDialog: React.FC<Props> = ({ open, onClose, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new account</DialogTitle>
      <DialogContent>
        <TextField label="Name" placeholder="Token name" required />
        <br />
        <TextField label="User" placeholder="User name or email" />
        <br />
        <TextField label="Description" placeholder="Anything you want to add" />
        <br />
        <TextField label="Secret" placeholder="Secret from your app" required />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSave({} as Account)}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AccountDialog
