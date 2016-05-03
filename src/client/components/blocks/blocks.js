import { connect } from "react-redux";
import { Component } from "react";
import {
	getBlocks
} from "../../actions/async/blocks"
require("./blocks.less");

class Blocks extends Component {

	renderBlocks(block) {

		return (
			<li key={block.id}>
				<span className="block-user">{block.user.screen_name}</span>
			</li>
		)
	}

	render() {

		return (
			<div className="blocks">
				<h2>Blocks</h2>
				<div className="blocks-button"
					onClick={this.props.onBlocksClick}>
					Get Blocks
				</div>
				<ul className="blocks-list">
					{this.props.blocks.map(this.renderBlocks, this)}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let blocks = state.blocks.blocks || [];

	return {
		blocks
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onBlocksClick: () => {
			dispatch(getBlocks("blockdotparty"))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks)
