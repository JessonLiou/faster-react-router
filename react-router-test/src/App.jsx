import React from "react";

import { RouterView } from 'faster-react-router';
import router from "./router";
import { Button } from "antd";

const routerViewRender = (route) => {
    if (route) {
        const matched = route.matched;
        const meta = matched.meta;
        return <matched.component pageId={meta.id} />
    }

    return null;
};

export default class App extends React.Component {
    state = {
        count: 0
    }

    jumpTo = (path) => {
        router.history.push(path);
    }

    render () {
        return (
            <div className="app">
                <Button onClick={this.jumpTo.bind(this, '/page1')}>Page1</Button>
                <Button onClick={this.jumpTo.bind(this, '/page2')}>Page2</Button>

                <div className="page">
                    <RouterView
                        router={router}
                        viewRender={routerViewRender}
                    />
                </div>
            </div>
        );
    }
}