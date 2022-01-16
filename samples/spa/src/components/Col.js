import { div } from "../../../../src/types";

const Col = ({ cols, kids }) => {
  return div({ class: "mb-6" }, [
    div({
      class: `grid gap-5 grid-cols-${cols}`
    }, [
      ...kids
    ])
  ])
}

export default Col;