import Label from '../types/Label'

interface DefaultLabel extends Label {
  icon: string
}

const defaultLabels: DefaultLabel[] = [
  {
    name: 'Messaging',
    id: 'social',
    icon: 'LocalPostOffice',
  },
  {
    name: 'Shops',
    id: 'shops',
    icon: 'Storefront',
  },
  {
    name: 'Code',
    id: 'code',
    icon: 'Code',
  },
  {
    name: 'Office',
    id: 'office',
    icon: 'AttachFile',
  },
  {
    name: 'Music',
    id: 'music',
    icon: 'Audiotrack',
  },
  {
    name: 'Work',
    id: 'work',
    icon: 'Work',
  },
]

export default defaultLabels
