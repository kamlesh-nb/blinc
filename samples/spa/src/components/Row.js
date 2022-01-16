import { div } from "../../../../src/types";

const Row = ({rows, kids}) => {
  return div({
    class: `grid gap-5 grid-rows-${rows}`
  },[
    ...kids
  ])
}

export default Row;