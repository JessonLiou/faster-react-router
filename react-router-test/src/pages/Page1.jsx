import React from 'react';
import { Button } from "antd";
import { RouterView } from 'faster-react-router';
import router from '../router';
import { NavigationButton } from '../components/NavigationButton';

class Page1 extends React.PureComponent {
    beforeLeave = (to, next) => {
        console.log('beforeLeave', to);
        next();
    }

    afterLeave = (to, next) => {
        console.log('afterLeave', to);
    }

    jumpTo = (path) => {
        router.history.push(path);
    }

    render () {
        return (
            <div>
                <span>Page1, id: {this.props.pageId}</span>
                <div>
                    <NavigationButton
                        path="/page1/child1"
                    >Child1</NavigationButton>
                    <NavigationButton
                        path="/page1/child2"
                    >Child2</NavigationButton>
                </div>
                <RouterView router={router} />
            </div>
        );
    }
}

export default Page1;
