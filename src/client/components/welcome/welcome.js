import { connect } from "react-redux";
import { Component } from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
require("./welcome.less");

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}

	toggleExpand() {
		this.setState({expanded: !this.state.expanded});
	};

	render() {

		return (
			<div className="welcome">
				<h1 className="welcome-header">block party</h1>
				<h2 className="welcome-subheader">Let's make Twitter fun again!</h2> 
      			<h3 className="welcome-subheader">We auto-block the jerks so you can focus on the important stuff.</h3>
				<div className="welcome-button">
					<a href="/auth/twitter" className="welcome-link">log in with Twitter</a>
				</div>
				<div 
					className="welcome-button"
					onClick={() => {this.toggleExpand()}}>
					tell me more
				</div>
				<div className="welcome-text"
					style={{opacity: this.state.expanded ? 1 : 0}}>
					<p>Freedom to participate in online discourse is an essential component of freedom of speech.</p>
					<p>All too often, voices are silenced by online harassment, like tweets that threaten physical violence and sexual assault.</p>
					<p>Block Party helps by blocking these abusive users on your behalf.</p> 
					<p>If you are mentioned in a tweet containing abusive language, we automatically block the user and remove the tweet from your timeline.</p>
					<p>Block Party will never block a Twitter user that you follow.</p>
	      		</div>
			</div>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		// 
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onMentionsClick: () => {
			dispatch({
				type: "CLICK_MENTIONS"
			})
		},
		onBlocksClick: () => {
			dispatch({
				type: "CLICK_BLOCKS"
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)