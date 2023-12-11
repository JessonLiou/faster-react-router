# fast-react-router@0.x

> Small router, support nest routes and high performance route match.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save fast-react-router

## Basic Usage
```js
/// router.js
import { Router } from 'fast-react-router';

const routes = [
    {
        path: '/',
        redirect: '/page1'
    },
    {
        path: '/page1',
        component: loadable(() => import('./pages/Page1')),
        meta: {
            id: 1
        },
        children: [
            {
                path: '/page1/child1',
                component: loadable(() => import('./pages/page1-children/Child1')),
                children: [
                    {
                        path: '/page1/child1/child1',
                        component: loadable(() => import('./pages/child1-children/Child1'))
                    },
                    {
                        path: '/page1/child1/child2',
                        component: loadable(() => import('./pages/child1-children/Child2'))
                    }
                ]
            },
            {
                path: '/page1/child2',
                component: loadable(() => import('./pages/page1-children/Child2'))
            }
        ]
    },
    {
        path: '/page2',
        component: Page2,
        meta: {
            id: 2
        }
    }
];

const router = new Router({
    routes,
    mode: 'browser' // hash | broswer
});

export default router;

```

```js
import React from "react";

import { RouterView } from 'fast-react-router';
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
```
