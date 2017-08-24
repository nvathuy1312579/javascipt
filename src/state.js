// import View from './view.js'
import Actions from './actions.js'
// //////////////////////////////////////////////////////////////////////////////
// State
//
export default class State {
  constructor (view) {
    this.view = view
    this.ready = this.ready.bind(this)
    this.representation = this.representation.bind(this)
    this.render = this.render.bind(this)
  }

  representation (model, actions) {
    // console.log(actions.present)
    if (this.ready(model)) {
      this.view.ready(model, actions.intents)
    }
  }

  ready (model) {
    return true
  }

  nextAction (model) { };

  render (model, actions) {
    this.representation(model, actions)
    this.nextAction(model)
  };

}

