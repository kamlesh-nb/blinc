import {div, p, strong } from '../../../../../build/tags'

const Footer = (props) => {
  return  div({class: "footer"}, [
    p({}, [
      strong({text: `Note:- `}),
      `This is an examples that demonstrates how a single page application can be developed using blinc. It also demonstrates how to handle sude effects in blinc using Commands and Subscriptions. `
    ])
  ]);
}

export default Footer