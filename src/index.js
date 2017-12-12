import StateContainer from "./state-container.js"
import StateWrapper from "./state-wrapper.js"
import EventEmitter from "event-emitter"

const StateProvider = initialState => {
	const id = new Date().getTime()
	const channel = `external-state-update-${id}`

	const emitter = EventEmitter({})
	const publish = emitter.emit.bind(emitter, channel)
	const subscribe = emitter.on.bind(emitter, channel)
	const unsubscribe = emitter.off.bind(emitter, channel)

	return {
		Container: StateContainer(id, initialState, subscribe, unsubscribe),
		Wrap: StateWrapper(id),
		Update: publish
	}
}

export default StateProvider