//routes
import routes from 'src/routes'
import { useRouter } from 'next/router'
import Link from 'next/Link'

//store
import { useStore } from 'src/store'

//use
import { useWindowSize } from 'react-use'

//methods & components
import dynamic from 'next/dynamic'
import * as components from 'src/mixin/components'
import { isEmpty, fetchAPI } from 'src/mixin/methods'

const { Layout, Lightbox, Icon, RatioArea, Editor } = components


import { CopyBlock, monokaiSublime } from "react-code-blocks"

import dayjs from 'dayjs'


import { initializeApp } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"
import React from 'react'

const firebaseApp = initializeApp({
  // apiKey: "apiKey",
  // authDomain: "projectId.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://jgb-frontend-interview-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // storageBucket: "bucket.appspot.com"
})

const db = getDatabase(firebaseApp)


export default function Home(){
  const store = useStore()
  const winSize = useWindowSize()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setName] = React.useState('')
  const [htmlForm, setHtmlForm] = React.useState({})
  const [cssForm, setCssForm] = React.useState({})
  const [jsForm, setJsForm] = React.useState({})
  const [showResultScreen, setShowResultScreen] = React.useState(false)

  async function submit(){
    setIsLoading(true)

    const result = await set(ref(db, 'interviews/'), {
      DATE: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      NAME: name,
      html: htmlForm,
      css: cssForm,
      js: jsForm,
    })

    setIsLoading(false)
    setShowResultScreen(true)

    return result

  }

  return (<form
  onSubmit={(e)=>{
    e.preventDefault()
    submit().then((r)=>{

    })
    .catch((error) => {
      console.error(error)
    })
  }}>
    <div className={`w-full h-full left-0 top-0 fixed z-50 flex justify-center items-center text-white text-[21px] ${isLoading ?'block' :'hidden'}`} style={{ background:'rgba(0,0,0,0.8)' }}>
      ....NOW LOADING...
    </div>

    <div className={`w-full h-full left-0 top-0 fixed z-50 flex flex-col flex-nowrap justify-center bg-white px-20 ${showResultScreen ?'block' :'hidden'}`}>
      <div className="pl-5" style={{borderLeft: 'solid 3px #da3932'}}>
        <img className="relative" src="assets/img/logo.svg" style={{width:'40px', top:'-4px'}}/>
        <div className="text-[21px] mb-4">THANK YOU</div>
        <div>
          <div className="text-[13px] text-grey-600">contact@jgbsmart.com</div>
          <div className="text-[13px] text-grey-600">+886 2 7730 5580</div>
          <div className="text-[13px] text-grey-600 mb-4">114 臺北市內湖區瑞光路335號8樓 (宏匯瑞光廣場B棟)</div>
          <div className="text-main-500 font-500">
            <a href="https://www.jgbsmart.com/">回首頁</a>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-grey-400 py-8 mb-8">
      <div className="container mb-4">
        <div className="row row-gap-0 items-center">
          <div className="col-auto">
            <div className="w-9 h-9 rounded-full flex justify-center items-center overflow-hidden">
              <img src="assets/img/logo.svg"/>
            </div>
          </div>
          <div className="col">
            <h1 className="text-[24px] font-500 pl-2">JGB 前端技能調查</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="mb-1">受訪人姓名</div>
        <input className="border border-gray-400 !h-[40px] rounded max-w-[237px]" type="text" required
        value={name}
        onChange={(e)=>{
          setName(e.target.value)
        }}/>
      </div>
    </div>

    <div className="container mb-4">
      <div className="text-[20px] font-500">HTML</div>
    </div>
    {
      [
       { title: '請簡述 cookies, sessionStorage 和 localStorage 的不同？' },
       { title: '請簡述什麼是 PWA（Progressive Web Apps）？' },
       { title: '請簡述 SSR、CSR 的差別？' },
      ].map((node, node_i)=>{
        return (
          <div className="container mb-8" key={node_i}>
            <div className="mb-2">{node_i+1}. { node?.title }</div>
            <div className="pl-4">
              <Editor
              onData={(e)=>{
                setHtmlForm((preData)=>{
                  return {
                    ...preData,
                    [node_i]: {
                      title: node?.title,
                      blocks: e?.blocks?.map((node)=>node?.data),
                    }
                  }
                })
              }}/>
            </div>
          </div>
        )
      })
    }

    <div className="container mb-4">
      <div className="text-[20px] font-500">CSS</div>
    </div>
    {
      [
        { title: '描述 “resetting” 和 “normalizing” 的差異性？你會選擇哪一種，為什麼選擇它？' },
        { title: '請解釋 *{ box-sizing: border-box; }？ 並且說明使用它的好處？' },
        { title: '請說明 inline 和 inline-block 的差異性？' },
        { title: '關於 position，請說明 relative、fixed、absolute 和 static 之間的差異性？' },
        { title: '請描述幾種 CSS 垂直置中的方式？' },
        { title: 'flex: 0 0 auto; 這三個值分別代表什麼意義？' },
        { title: 'flex: row nowrap; 這兩個值分別代表什麼意義？' },
        { title: '你目前有使用哪一套 CSS Framework 在開發環境或產品線上？ 他有什麼優缺點？' },
        { title: '是否曾使用 CSS Grid？ 根據自己對 CSS Grid 的理解和熟悉度，1~10 分，你會給自己幾分' },
      ].map((node, node_i)=>{
        return (
          <div className="container mb-8" key={node_i}>
            <div className="mb-2">{node_i+1}. { node?.title }</div>
            <div className="pl-4">
              <Editor
              onData={(e)=>{
                setCssForm((preData)=>{
                  return {
                    ...preData,
                    [node_i]: {
                      title: node?.title,
                      blocks: e?.blocks?.map((node)=>node?.data),
                    }
                  }
                })
              }}/>
            </div>
          </div>
        )
      })
    }

    <div className="container mb-4">
      <div className="text-[20px] font-500">JavaScript</div>
    </div>
    {
      [
        {
          title: '簡述閉包是什麼？',
        },
        {
          title: '為了暫存住原始物件內的資料，將其複製一份出來供 UI 上操作，但為什麼當更新複製出來物件時，原始物件的資料也會跟著改變？ 該怎麼解? 淺拷貝和深拷貝的解法各自為何？',
        },
        {
          title: 'foo 的值是什麼？',
          codeExample: `
          var foo = 10 + '20';
          `,
        },
        {
          title: '實作符合下面的函式',
          codeExample: `
          add(2, 5); // 7
          add(2)(5); // 7
          `,
        },
        {
          title: '下面的兩個 alerts 的結果會是什麼？',
          codeExample: `
          var foo = "Hello";

          (function() {
            var bar = " World";
            alert(foo + bar);
          })();

          alert(foo + bar);
          `,
        },
        {
          title: '下面 foo.length 的值是什麼？',
          codeExample: `
          var foo = [];
          foo[1] = 'Hello';
          `,
        },
        {
          title: '下面這段會印出什麼？',
          codeExample: `
          console.log('one');

          setTimeout(function() {
            console.log('two');
          }, 0);

          console.log('three');
          `,
        },
        {
          title: '請問 foo()、bar.logThis()、baz() 三者分別會印出來什麼？',
          codeExample: `
          function foo (){
            console.log(this)
          }

          var bar = {
            logThis(){
              console.log(this)
            }
          }

          var baz = foo.logThis
          `,
        },
      ].map((node, node_i)=>{
        return (
          <div className="container mb-8" key={node_i}>
            <div className="mb-2">{node_i+1}. { node?.title }</div>
            <div className="pl-4">
              {
                node?.codeExample
                ?(
                  <div className="mb-2">
                  <CopyBlock
                  text={node.codeExample}
                  language="javascript"
                  codeBlock
                  theme={monokaiSublime}
                  />
                  </div>
                )
                :null
              }
              <Editor
              onData={(e)=>{
                setJsForm((preData)=>{
                  return {
                    ...preData,
                    [node_i]: {
                      title: node?.title,
                      blocks: e?.blocks?.map((node)=>node?.data),
                    }
                  }
                })
              }}/>
            </div>
          </div>
        )
      })
    }

    <div className="flex justify-center pb-8">
      <button className="rounded bg-main text-white py-2 px-6 hover:bg-main-700 cursor-pointer font-500">SUBMIT</button>
    </div>
  </form>)
}


export async function getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // const result = await

  // return {
  //   props: {
  //     posts,
  //   },
  // }
  return {
    props: {}
  }
}

