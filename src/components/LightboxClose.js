//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty } from 'src/mixin/methods'
const { Icon } = components

function LightboxClose(props){

  const store = useStore()

  React.useEffect(()=>{

    function lightboxClickHandler(e){
      if( $(e.target).data('el') == 'lightbox'){
        store.lightboxOpen(null)
      }
    }

    $('body').on('click', lightboxClickHandler)


    return function(){
      $('body').off('click', lightboxClickHandler)
    }
  }, [store.lightbox])

  return(
      <div className="flex justify-end">
        <div className="btn"
        onClick={()=>{
          store.lightboxOpen(null)
        }}>
          <Icon type="X" />
        </div>
      </div>
    )
}

export default LightboxClose