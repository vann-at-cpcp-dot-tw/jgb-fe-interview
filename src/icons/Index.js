const Components = {
  X: React.lazy(()=>import('src/icons/X')),
}

export default function Icon(props){
  return(<React.Suspense fallback={null}>
  {(()=>{

    if (typeof Components[props.type] !== "undefined") {
      return (
        React.createElement(Components[props.type], {
          key: props._uid,
          ...props,
        })
      )
    }

    return React.createElement(
      () => <div>The component {props.type} has not been created yet.</div>,
      { key: props._uid }
    )
  })()}
  </React.Suspense>)
}