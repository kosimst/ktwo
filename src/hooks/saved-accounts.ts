import { useState, useEffect } from 'react'
import Account from '../types/Account'

const useSavedAccounts = (): [
  Account[],
  (setter: Account[] | ((oldAccounts: Account[]) => Account[])) => void,
] => {
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const unencryptedRaw = localStorage.getItem('unencrypted') || '[]'

    try {
      const unencrypted = JSON.parse(unencryptedRaw) as Account[]
      setAccounts((old) => [...old, ...unencrypted])
    } catch (e) {
      // TODO: Add error alert and ask what to do
      localStorage.setItem('unencrypted', '[]')
    }
  }, [])

  const update = (
    setter: Account[] | ((oldAccounts: Account[]) => Account[]),
  ) => {
    if (typeof setter === 'function') return setAccounts((old) => setter(old))
    setAccounts(setter)
  }

  return [accounts, update]
}

export default useSavedAccounts
