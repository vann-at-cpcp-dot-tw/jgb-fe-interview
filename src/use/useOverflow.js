import { ref, reactive, watch, onMounted} from 'vue'

export default function(passState={}){

    const overflowElRef = ref(null)

    const state = reactive({
       hasScroll: false,
       scrollPos: 'start',
       ...passState,
    })

    const updateScrollBar = function(){
        state.hasScroll = overflowElRef.value?.scrollWidth > overflowElRef.value?.clientWidth
     }


    watch(()=>overflowElRef.value, ()=>{
        updateScrollBar()

        $(overflowElRef.value).off('scroll')
        $(overflowElRef.value).on('scroll', ()=>{

            if( !state.hasScroll ){
                return
            }

            const scrollLeft = overflowElRef?.value?.scrollLeft
            if( scrollLeft == 0){
                state.scrollPos = 'start'
            }
            else if ( scrollLeft > 0 && scrollLeft< (overflowElRef.value?.scrollWidth) - (overflowElRef.value?.clientWidth) ){
                state.scrollPos = 'center'
            }
            else if( scrollLeft >= (overflowElRef.value?.scrollWidth) - (overflowElRef.value?.clientWidth) ){
                state.scrollPos = 'end'
            }
        })

    }, {
        immediate: true,
    })


    onMounted(()=>{
        let resizeTimer
        $(window).on('resize', function(){
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(()=>{
                updateScrollBar()
            }, 250)
        })
    })

    return {
        ref: overflowElRef,
        state: state,
    }
}
