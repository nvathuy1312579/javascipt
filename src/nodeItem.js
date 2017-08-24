export default class NodeItem {
  constructor (data, intents) {
    this.data = data
    const container = document.createElement('li')
    const content = `<div id="${this.data.title}-${this.data.id}" class = "card">
                        <div class="card__image">
                          <img src="images/avatar.png">
                          <p class="card__title__id-number">
                            <span class="employee__title">${this.data.title}</span>
                            <span class="employee__id-number">${this.data.id}</span>
                          </p>
                        </div>
                        <div class="card__profile">
                          <input type="text" class="card__profile__title" disabled value="${this.data.firstName} ${this.data.lastName}">
                          <input type="text" class="card__profile__department" disabled value="${this.data.department}">
                          <input type="text" class="card__profile__employeeId" disabled value="${this.data.employeeId}">
                          <p class="card__profile__mail">@kms-technology.com</p>
                        </div>
                        <div class="card__action">
                          <a class="card__action__edit" click="${intents['editCard']}"><span class="icomoon-icon edit-icon"></span></a><br>
                          <a class="card__action__arrow-down" click="${intents['addDown']}"><span class="icomoon-icon arrow-down-icon"></span></a><br>
                          <a class="card__action__arrow-right" click="${intents['addRight']}"><span class="icomoon-icon arrow-right-icon"></span></a><br>
                          <a class="card__action__remove" click="${intents['removeCard']}"><span class="icomoon-icon remove-icon"></span></a>
                        </div>
                        <div class="card__collapse-button" style="display: none"><span class="icomoon-icon minus-circle-icon"></span></div>
                      </div>`
    const title = container.appendChild(document.createElement('a'))
    title.innerHTML = content
    this.element = container
  }

  getChildrenElement () {
    return this._childElement = this._childElement || this.element.appendChild(document.createElement('ul'))
  }
}
