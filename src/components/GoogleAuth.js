import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '786970672332-gk5m694qgvp2uojvc3a9lb5fif0gd69n.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInButtonClick = () => {
        this.auth.signIn();
    }

    onSignOutButtonClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOutButtonClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignInButtonClick}>
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

/**
 * Client Id:
 * 786970672332-gk5m694qgvp2uojvc3a9lb5fif0gd69n.apps.googleusercontent.com
 */