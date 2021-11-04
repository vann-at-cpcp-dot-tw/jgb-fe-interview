import { isEmpty } from 'src/mixin/methods'
import * as components from 'src/mixin/components'
const { Header, Footer } = components

export default function LayoutGeneral(props){

  return (
    <div className={`relative min-h-full flex flex-col ${props?.classes?.wrapper ?props.classes.wrapper :''}`}>
        <Header />

        <main className={`flex-grow relative ${props?.classes?.main ?props.classes.main :''}`}>
        {props.children}
        </main>

        <div className="mt-auto">
          <Footer />
        </div>
    </div>
  )

}