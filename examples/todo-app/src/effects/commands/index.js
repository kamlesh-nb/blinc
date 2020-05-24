import { titleToUpper } from '../../messages'

const testCmd = (param, dispatch) => {
    console.log(`cmd called with param: ${param}`);
    dispatch(titleToUpper(param.id))
}

export { testCmd }