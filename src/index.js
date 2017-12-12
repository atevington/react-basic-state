import StateContainer from "./state-container.js"
import StateWrapper from "./state-wrapper.js"
import EventEmitter from "event-emitter"

const emitter = EventEmitter({})

const StateProvider = initialState => {
	const id = new Date().getTime()

	const channelInternal = `internal-state-update-${id}`
	const publishInternal = emitter.emit.bind(emitter, channelInternal)
	const subscribeInternal = emitter.on.bind(emitter, channelInternal)
	const unsubscribeInternal = emitter.off.bind(emitter, channelInternal)

	const channelExternal = `external-state-update-${id}`
	const publishExternal = emitter.emit.bind(emitter, channelExternal)
	const subscribeExternal = emitter.on.bind(emitter, channelExternal)
	const unsubscribeExternal = emitter.off.bind(emitter, channelExternal)

	return {
		container: StateContainer(id, initialState, subscribeInternal, unsubscribeInternal, subscribeExternal, unsubscribeExternal),
		wrap: StateWrapper(id, publishInternal),
		update: publishExternal
	}
}

export default StateProvider