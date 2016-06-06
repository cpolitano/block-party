import { connect } from "react-redux";
import { Component } from "react";
import {
	getBlocks
} from "../../actions/async/blocks"
require("./blocks.less");

class Blocks extends Component {

	componentWillMount() {
		if ( !this.props.recentlyFetched ) {
			this.props.getBlocks();
		}
	}

	renderBlocks(block) {

		return (
			<li key={block.id_str} className="block">
				<span className="block-user">{block.name}</span>
				{block.screen_name}
			</li>
		)
	}

	render() {

		return (
			<div className="blocks">
				<h2>Blocks</h2>
				<ul className="blocks-list">
					{this.props.blocks.map(this.renderBlocks, this)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let blocks = state.blocks.blocks || [];
	let recentlyFetched = state.mentions.recentlyFetched;

	return {
		blocks,
		recentlyFetched
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getBlocks: () => {
			dispatch(getBlocks())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks)
