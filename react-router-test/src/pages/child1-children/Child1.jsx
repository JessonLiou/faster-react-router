import React from 'react';
import router from '../../router';

class Child1 extends React.PureComponent {

    jumpTo = (path) => {
        router.history.push(path);
    }

    render () {
        return (
            <div>
                <div>Child1's Child1</div>
            </div>
        );
    }
}

export default Child1;
