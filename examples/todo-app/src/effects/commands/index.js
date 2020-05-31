import { titleToUpper } from '../../messages'

const testCmd = (props = {}) => {
    console.log(`cmd called with param: ${JSON.stringify(props.param)}`);
    props.dispatch(titleToUpper(props.param.id))
}

export { testCmd }