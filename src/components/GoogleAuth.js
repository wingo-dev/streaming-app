import React from 'react';

class GoogleAuth extends React.Component{
    state = {isSignedIn: null};
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'403028951197-e1ek8id2r0q2v1dbljkt2pn3igrbcbv9.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'streamy'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = () =>{
        this.setState({isSignedIn: this.auth.isSignedIn.get()});
    }
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton (){
        if (this.state.isSignedIn === null) {
            return null;
        }else if (this.state.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                <i className="google icon"></i>
                Sign Out
                </button>
            );
        }else{
            return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Sign In
                </button>
            );
        }
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default GoogleAuth;