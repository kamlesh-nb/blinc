import  {View}  from '../../../dist/'
import  {div, label, input}  from '../../../dist/tags'
  
const Todo = () => {
    let init = [0]    
    const update = () => { 
    }
    const view = (state, dispatch) => {
        return div({}, [
            label({text: 'Hello World!!'}),
            input({}),
            div({},[
                label({text: 'this is it'})
            ])
        ])
    }   
 
    return { init, update, view }
}

let view = View(Todo())
let $node = document.body
view.mount($node)
 
var d = label({text: 'Hello   Universe !!'})
console.log(d);  