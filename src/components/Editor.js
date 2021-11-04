//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//use
import { useWindowSize } from 'react-use'
import { useUID } from 'react-uid'

//methods & components
import * as components from 'src/mixin/components'
import { isEmpty } from 'src/mixin/methods'
const { Lightbox, Icon } = components

import EditorJS from "@editorjs/editorjs"
import Embed from "@editorjs/embed"
import Table from "@editorjs/table"
import List from "@editorjs/list"
import Warning from "@editorjs/warning"
import Code from "@editorjs/code"
// import Code from 'public/static/libs/editorjs-code'
import LinkTool from "@editorjs/link"
import Image from "@editorjs/image"
import Raw from "@editorjs/raw"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import CheckList from "@editorjs/checklist"
import Delimiter from "@editorjs/delimiter"
import InlineCode from "@editorjs/inline-code"
import SimpleImage from "@editorjs/simple-image"
import EJLaTeX from "editorjs-latex"

export default function Editor(props){
  const store = useStore()
  const winSize = useWindowSize()
  const uid = useUID()
  const EDITOR_JS_TOOLS = {
    // Math: {
    //   class: EJLaTeX
    // },
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    // raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage
  }

  React.useEffect(()=>{
    const editor = new EditorJS({
      holder: `codeEditor${uid}`,
      tools: EDITOR_JS_TOOLS,
      onChange: (e)=>{
        editor.save().then((outputData) => {
          props?.onData(outputData)
        })
      }
    })

    return ()=>{
      editor.destroy()
    }
  }, [])

  return (<>
    <div className="myEditor" id={`codeEditor${uid}`}></div>
  </>)
}