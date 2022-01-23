import { div } from "../../../../src/types";

const TreeView = ({ dataset }) => {
    return div()
}

export default TreeView;


/*
 return div({
        class: "w-full p-2 bg-grey text-sm text-darkgrey"
    }, [
        ...Object.keys(dataset).map((value, index) => {
            return div({ class: "w-full text-sm text-darkgrey", key: index }, [
                div({ class: "group outline-none accordion-section", key: index }, [
                    dataset[value].name
                ]),
                ...dataset[value].routes.map((route, index) => {
                    return div({ class: "group outline-none accordion-section", key: index }, [
                        div({ class: "px-2", key: index }, [route.name]),
                        ...route.params.map((param, index) => {
                            return div({ class: "px-4 group outline-none accordion-section", key: index }, [param.name])
                        })
                    ])
                })
            ])
        })
    ])
*/