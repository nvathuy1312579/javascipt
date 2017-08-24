import State from './state.js'
import View from './view.js'
import Model from './model.js'
import Actions from './actions.js'

const view = new View()
const state = new State(view)
const model = new Model(state)
const actions = new Actions(model.present)

state.representation(model, actions)

// export { actions }

