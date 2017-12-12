import React from "react"
import {Broadcast} from "react-broadcast"
const DumbComponent = props => props.children

const StateContainer = (id, initialState, subscribe, unsubscribe) => class extends React.Component {
	constructor(props) {
		super(props)

		this.state = initialState || null
		this.updateStateExternal = action => this.setState(action(this.state))
		this.boundSetState = this.setState.bind(this)
	}

	componentDidMount() {		
		subscribe(this.updateStateExternal)
	}

	componentWillUnmount() {
		unsubscribe(this.updateStateExternal)
	}

	render() {
		return (
			<Broadcast channel={`state-set-${id}`} value={this.boundSetState}>
				<Broadcast channel={`state-update-${id}`} value={this.state}>
					<DumbComponent>
						{this.props.children}
					</DumbComponent>
				</Broadcast>
			</Broadcast>
		)
	}
}

export default StateContainer