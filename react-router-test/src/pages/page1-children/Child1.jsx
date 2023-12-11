import React from 'react';
import { Button } from "antd";
import { RouterView } from 'faster-react-router';
import router from '../../router';

class Child1 extends React.PureComponent {

    jumpTo = (path) => {
        router.history.push(path);
    }

    render () {
        return (
            <div>
                <div>Child1</div>
                <div>
                    <Button onClick={this.jumpTo.bind(this, '/page1/child1/child1')}>Child1's Child1</Button>
                    <Button onClick={this.jumpTo.bind(this, '/page1/child1/child2')}>Child1's Child2</Button>
                </div>
                <RouterView router={router} />
            </div>
        );
    }
}

export default Child1;
