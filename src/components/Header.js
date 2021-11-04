//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty } from 'src/mixin/methods'
const { Lightbox, Icon } = components

export default function Header(){
  const store = useStore()

  return (<></>)
}