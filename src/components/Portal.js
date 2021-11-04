export default function Portal(props){
  return ReactDOM.createPortal(
    props.children,
    props.dom
  )
}