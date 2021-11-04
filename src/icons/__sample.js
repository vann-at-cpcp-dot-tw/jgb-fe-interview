export default function Sample({
  width,
  height,
  style = {},
  fill = '#444',
  hover = {
    fill: '',
  },
  className = '',
  classNames = {
    svg: '',
    icon: '',
  },
}={}){

  const [localFill, setLocalFill] = React.useState(fill)

  React.useEffect(()=>{
    setLocalFill(fill)
  }, [fill])


  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    style={{
      width: typeof width === 'number' ?`${width}px` :width,
      height: typeof height === 'number' ?`${height}px` :height,
      ...style,
    }}
    className={`${className} ${classNames?.svg}`}
    onMouseOver={()=>{
        if( hover.fill ){
          setLocalFill(hover.fill)
        }

    }}
    onMouseLeave={()=>{
      setLocalFill(fill)
    }}>

      <path fill={localFill} fill-rule="evenodd" d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"/>

    </svg>
  )
}