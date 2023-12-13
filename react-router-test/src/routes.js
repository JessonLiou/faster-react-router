import loadable from '@loadable/component';
import Page2 from './pages/Page2';
import NotFound from './pages/NotFound';

const routes = [
    {
        path: '/',
        redirect: '/page1'
    },
    // {
    //     path: '/page1/child2',
    //     redirect: '/page1/child1/child2'
    // },
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
    },
    {
        path: '/404',
        component: NotFound,
        meta: {
            id: 2
        }
    }
];

export default routes;