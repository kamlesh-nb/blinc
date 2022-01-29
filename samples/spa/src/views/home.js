import { div } from "../../../../src/types";
import { TreeView } from './../components'

const Home = (props) => {
    let state = {
        services: {
            order: {
                name: "Order.API",
                domain: "Order",
                routes: [{
                    name: "ById",
                    method: "get",
                    is_collection: false,
                    params: [{
                        name: "OrderId"
                    }]
                }]
            },
            payment: {
                name: "Payment.API",
                domain: "Payment",
                routes: [{
                    name: "ById",
                    method: "get",
                    is_collection: false,
                    params: [{
                        name: "PaymentId"
                    }, {
                        name: "OrderId"
                    }]
                }]
            }
        }
    }
    const render = () => {
        return div([
            TreeView({
                dataset: state.services
            })
        ]);
    };
    return { render };
};

export default Home