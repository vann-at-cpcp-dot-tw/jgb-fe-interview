import { isEmpty } from 'resources/mixin/methods'
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue'

export default function useArray(passState) {

    const state = reactive({
        nodes: [],
        ...passState,
    })

    function toggle(value, {identifier, index}={}){

        if( !isEmpty(identifier) ){ //如果 array 裡面裝的是物件，用物件內的屬性來辨識 toggle

            let itemInArray = state.nodes.find((node)=>{ return node[identifier] == value[identifier] })

            if( itemInArray ){
                state.nodes = state.nodes.filter((node)=>{ return node[identifier] !== value[identifier] })
            }else{
                state.nodes.push(value)
            }

            return

        }
        else if( !isEmpty(index) && isEmpty(identifier) ){ //或者可以用 index 辨識

            let itemInArray = state.nodes.find((node, nodeIndex)=>{ return nodeIndex == index })

            if( itemInArray ){
                state.nodes = filter((node, nodeIndex)=>{ return nodeIndex !== index })
            }else{
                state.nodes.push(value)
            }

            return
        }
        else{ //如果 array 裡面裝的是純 value


            if( state.nodes.includes(value) ){

                console.log(state.nodes.filter((node)=>{ console.log(node !== value); return node !== value}))
                state.nodes = state.nodes.filter((node)=>{ console.log(node !== value); return node !== value})
                console.log(state.nodes)

            }else{
                state.nodes.push(value)
            }

            return

        }
    }

    return {
        state,
        toggle: toggle,
    }
}
