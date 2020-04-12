import React, { Component } from 'react';

import './TaskGroupHeader.scss';

class TaskGroupHeader extends Component {
    render() { 
        return ( 
            <div className="task-group-header task-content" id={this.props.id}>{ this.props.name }</div>
         );
    }
}
 
export default TaskGroupHeader;