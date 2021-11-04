//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//use
import {useWindowSize} from 'react-use'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty } from 'src/mixin/methods'
const { Lightbox, Icon } = components

export default function RatioArea(props){
  const store = useStore()
  const winSize = useWindowSize()
  // const props = {
  //   ratio: {
  //       type: [String, Number],
  //       required: true,
  //   },
  //   responsive: {
  //       type: Array,
  //       default: ()=>[
  //           // {
  //           //     breakpoint: 991,
  //           //     ratio: 58,
  //           // },
  //           // {
  //           //     breakpoint: 767,
  //           //     ratio: 36,
  //           // },
  //       ],
  //   },
  // }

  const fillStyle = React.useMemo(()=>{

    let ratio = props.ratio

    if( props.responsive?.length>0 ){

        const orderedResponsive =  this.responsive.concat().sort((a, b)=>{
            return a.breakpoint - b.breakpoint //小到大
        });

        for (let i=0; i<orderedResponsive.length; i++){
            if( window.matchMedia(`(max-width: ${orderedResponsive[i].breakpoint}px)`).matches ){
                ratio = orderedResponsive[i].ratio
                break;
            }
        }
    }

    return {
        width: '100%',
        paddingBottom: `${ratio}%`
    }

  }, [winSize.width])


  return (<>
    <div className="ratioArea relative">
        <div className="fill" style={fillStyle}></div>
        {props.children}
    </div>
    <style lang="sass" jsx>{`
      .fill{
          position: relative;
          pointer-events: none;
      }
      .ratioArea{
          width: 100%;
      }
    `}</style>
  </>)
}

