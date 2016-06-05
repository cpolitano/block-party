import { connect } from "react-redux";
import { Component } from "react";
import {
	getMentions
} from "../../actions/async/mentions"
import Snackbar from "material-ui/Snackbar";
require("./mentions.less");

class Mentions extends Component {

	componentWillMount() {
		if ( !this.props.recentlyFetched ) {
			this.props.getMentions();
		}
	}

	renderTweets(tweet) {
		const tweetUrl = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;

		return (
			<li key={tweet.id} className="mention">
				<span className="mentions-user">{tweet.user.screen_name}</span>
				{tweet.text}<br/>
				<a href={tweetUrl} target="_blank">{tweet.created_at}</a>
			</li>
		)
	}

	render() {

		let blockMessage = "Party on, no new blocks.";

		if (this.props.recentlyBlocked.length > 0) {
			let blocks = "";
			for (let block of this.props.recentlyBlocked) {
				blocks = blocks + "@" + block + " "
			}
			blockMessage = "Blocked " + blocks;
		}

		let BlocksSnackbar = (
			<Snackbar 
				bodyStyle={{backgroundColor: "#55ACEE"}}
				label="Default"
				autoHideDuration={6000}
				message={blockMessage}
				open={true} />
		);

		return (
			<div className="mentions">
				<h2>Recent Mentions</h2>
				<ul className="mentions-list">
					{this.props.mentions.map(this.renderTweets, this)}
				</ul>
				{BlocksSnackbar}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let mentions = state.mentions.mentions || [];
	let recentlyFetched = state.mentions.recentlyFetched;
	let recentlyBlocked = state.mentions.recentlyBlocked || [];

	return {
		mentions,
		recentlyFetched,
		recentlyBlocked
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getMentions: () => {
			dispatch(getMentions())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mentions)
