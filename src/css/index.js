
const _css = () => {
  let _rules = []
  
  const str = (strings, ...args) => {
    const interleaved = args.reduce(
      (acc, arg, index) => {
        return [...acc, arg, strings[index + 1]];
      },
      [strings[0]]
    );
    return props =>
    interleaved
      .map((part) => (typeof part === "function" ? part(props) : part))
      .join("")
   
  };
  
  const _rule = str`{${props => Object.entries(props).map((k,v)=>{
    return ` ${k[0].replace(/_/g, '-')}: ${k[1]}; `
  }).join('')}}`

   
  const addRules = (rules = {}) => {
    for ( const [k, v] of Object.entries(rules)){
      _rules.push({name: k, value: _rule(v)})
    }
  }
  const getRules = () => _rules

  return { addRules, getRules }
}

let css = _css()


export default css;
