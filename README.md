# React Basic State

Simple and easy state management for React. See a demo [here](https://www.webpackbin.com/bins/-L088tSDNRxgmAQod3Kh).

## Usage

Install the module:

```
npm install react-basic-state --save
```

Import the module:

```javascript
// ES6 module
import StateProvider from "react-basic-state"

// Common JS
const StateProvider = require("react-basic-state")
```

Set your initial state:

```javascript
const AppState = StateProvider({count: 0})
```

Get your container component:

```javascript
const StateContainer = AppState.container
```

Wrap some stateless components:

```javascript
// AppState.wrap is analogous to connect in Redux
// AppState.wrap(componentToBeWrapped, stateToProps, actionsToProps)

// Inject state into a component's props
const DisplayText = props => props.text
const DisplayCounter = AppState.wrap(DisplayText, {text: state => state.count})

// Inject actions that manipulate state into a component's props
// An action is just a function that performs a shallow merge on the current state
const ClickMe = props => <span style={{cursor: "pointer"}} onClick={props.onClick}>{props.children}</span>
const incrementCounter = state => () => ({count: state.count + 1})
const Incrementer = AppState.wrap(ClickMe, null, {onClick: incrementCounter})
```

Bring it all together:
```javascript
ReactDOM.render(
	<StateContainer>
		Current: <DisplayCounter />
		<Incrementer>+</Incrementer>
	</StateContainer>,
	document.getElementById("app")
)
```

## Notes

Under the hood, this is just calling `setState` on your `StateContainer` component, and notifying children of updates through [react-broadcast](https://github.com/ReactTraining/react-broadcast). The normal rules about updating `state` apply: don't mutate it directly and treat it as immutable.

It's also possible to update state outside the context of a component. After your `StateContainer` component has mounted, you can call `AppState.update`:

```javascript
const resetCounter = state => ({count: 0})
AppState.update(resetCounter)
```