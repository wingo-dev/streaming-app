import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues =>{
        console.log(formValues);
        this.props.editStream(this.props.match.params.id, formValues);
    }
   render(){ 
       if (!this.props.stream){
           return;
       }
       return(
            <div className="ui">
                <h3>Edit a Stream</h3>
                <StreamForm 
                    onSubmit={this.onSubmit} 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps);
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);