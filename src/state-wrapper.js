import React from "react"
import {Subscriber} from "react-broadcast"

const StateWrapper = id => (Wrapped, stateToProps, actionsToProps) => class extends React.Component {
	constructor(props) {
		super(props)
	}

	mapParamsToProps(state, setState) {
		const mappedProps = {}

		if (stateToProps) {
			Object.keys(stateToProps)
				.map(key => mappedProps[key] = stateToProps[key](state))
		}

		if (actionsToProps) {
			Object.keys(actionsToProps)
				.map(key => mappedProps[key] = (...args) => setState(actionsToProps[key](state)(...args)))
		}

		return mappedProps
	}

	render() {
		return (
			<Subscriber channel={`state-set-${id}`}>
				{
					setState =>
					<Subscriber channel={`state-update-${id}`}>
						{
							state =>
							<Wrapped {...this.props} {...this.mapParamsToProps(state, setState)} />
						}
					</Subscriber>
				}
			</Subscriber>
		)
	}
}

export default StateWrapper