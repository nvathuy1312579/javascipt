import Theme from './theme.js'
// //////////////////////////////////////////////////////////////////////////////
// View
//
export default class View {
  constructor (view) {
    this.view = view
  }
  // State representation of the ready state
  ready (model, intents) {
    // generate the representation of each component
    const theme = new Theme()
    theme.header()
    theme.tree(model, intents)
  }
}

