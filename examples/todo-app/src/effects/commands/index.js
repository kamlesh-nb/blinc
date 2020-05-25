import { titleToUpper } from '../../messages'

const testCmd = (param, dispatch) => {
    console.log(`cmd called with param: ${JSON.stringify(param)}`);
    dispatch(titleToUpper(param.id))
}

export { testCmd }