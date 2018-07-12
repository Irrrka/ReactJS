import React, { Component } from 'react';

const PrivateRoute = ComposedComponent => {
    return class Authentication extends Component {
		componentDidMount() {
			if(this.props.role !== 'admin') {
				this.props.history.push('/login');			
			}
		}

		render() {
			return(
				<div>
					<ComposedComponent {...this.props} />
				</div>
			)
		}
	}
} 

export default PrivateRoute;



