import React from "react"
import {Broadcast} from "react-broadcast"
const DumbComponent = props => props.children

const StateContainer = (
	id,
	initialState,
	subscribeInternal,
	unsubscribeInternal,
	subscribeExternal,
	unsubscribeExternal
) => class extends React.Component {
	constructor(props) {
		super(props)

		this.state = initialState || null
		this.updateStateInternal = updatedState => this.setState(updatedState)
		this.updateStateExternal = action => this.setState(action(this.state))
	}

	componentWillMount() {
		subscribeInternal(this.updateStateInternal)
		subscribeExternal(this.updateStateExternal)
	}

	componentWillUnmount() {
		unsubscribeInternal(this.updateStateInternal)
		unsubscribeExternal(this.updateStateExternal)
	}

	render() {
		return (
			<Broadcast channel={`state-update-${id}`} value={this.state}>
				<DumbComponent>
					{this.props.children}
				</DumbComponent>
			</Broadcast>
		)
	}
}

export default StateContainer