import StateContainer from "./state-container.js"
import StateWrapper from "./state-wrapper.js"
import EventEmitter from "event-emitter"

const emitter = EventEmitter({})

const StateProvider = initialState => {
	const id = new Date().getTime()
	const channel = `external-state-update-${id}`

	const publish = emitter.emit.bind(emitter, channel)
	const subscribe = emitter.on.bind(emitter, channel)
	const unsubscribe = emitter.off.bind(emitter, channel)

	return {
		container: StateContainer(id, initialState, subscribe, unsubscribe),
		wrap: StateWrapper(id),
		update: publish
	}
}

export default StateProvider