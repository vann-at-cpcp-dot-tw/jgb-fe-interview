//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Router from "next/router"
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//use
import { useWindowSize, useInterval } from 'react-use'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty, fetchAPI } from 'src/mixin/methods'
const { Layout, Lightbox, Icon } = components

//styles
import 'src/styles/tailwind-base.css'
import 'src/styles/main.sass'
import 'src/styles/tailwind.css'


function MyApp(props) {
  const store = useStore()
  const router = useRouter()

  const {
    Component,
    pageProps
  } = props


  return <>
    <Component {...pageProps} />
  </>
}

MyApp.getInitialProps = async (ctx) => {
  return {}
}

export default MyApp