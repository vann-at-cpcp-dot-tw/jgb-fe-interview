//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty } from 'src/mixin/methods'

const { Portal } = components

function Lightbox(props){
  const store = useStore()
  const innerRef = React.useRef(null)
  const lightboxRef = React.useRef(null)

  React.useEffect(()=>{
    if( store.lightbox ){
      $('body').addClass('lb-open')
    }

    return function(){
      $('body').removeClass('lb-open')
    }

  }, [store.lightbox])

  return(
    <>
      {
        store.lightbox == props.id
        ?(
          <Portal dom={document.body}>
            <div className="lightbox" data-el="lightbox" id={props?.id} ref={lightboxRef}>
              <div className="inner" style={{maxWidth: props?.maxWidth}} ref={innerRef}>
                <div className="lg:px-8 lg:py-6 p-6">{props?.children}</div>
              </div>
            </div>
          </Portal>
        )
        :('')
      }
      <style jsx lang="saass" global>{`
        .lightbox{
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 9999;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background-color: rgba(25,25,25,0.8);
          overflow: auto;
          padding: 30px 20px;

          >.inner {
            width: 100%;
            max-width: 680px;
            margin-top: auto;
            margin-bottom: auto;
            position: relative;
            background: white;
          }

          .close {
            position: absolute;
            right: -32px;
            top: -32px;
            cursor: pointer;
          }
        }
      `}</style>
    </>
    )
}

export default Lightbox