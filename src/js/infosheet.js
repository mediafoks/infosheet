// alert
class Infosheet {
    constructor(options) {
        let defaultOptions = {
            title: '',
            message: 'no message',
            cssClass: 'default',
            delay: null,
            speed: 180,
            isOpen: () => {},
            isClose: () => {},
        }

        this.options = Object.assign(defaultOptions, options)
        this.title = this.options.title
        this.message = this.options.message
        this.cssClass = this.options.cssClass
        this.delay = parseInt(this.options.delay)
        this.speed = this.options.speed
        this.wrap = null
        this.alert = null

        this.init()
    }

    init() {
        this.wrap = this.#getInfosheetWrap()
        this.alert = this.#createElem(this.cssClass)

        if (this.delay) setTimeout(() => this.close(), this.delay)

        this.#monitorClick()
    }

    #getInfosheetWrap() {
        if (document.querySelector('.infosheet-wrapper')) {
            return (this.wrap = document.querySelector('.infosheet-wrapper'))
        }

        return this.#createElem('infosheet-wrapper')
    }

    #createElem(cssClass) {
        let elem = document.createElement('div')

        if (cssClass == 'infosheet-wrapper') {
            elem.classList.add('infosheet-wrapper')
            document.body.append(elem)
            return elem
        }
        if (this.title) {
            elem.innerHTML = `
                <div class="infosheet__title">${this.title}</div>
                <p class="infosheet__txt">${this.message}</p>
            `
        } else {
            elem.innerHTML = this.message
        }

        elem.classList.add('infosheet')
        elem.classList.add(`_${this.cssClass}`)
        elem.setAttribute('tabindex', 0)
        this.wrap.append(elem)

        setTimeout(() => {
            if (this.speed > this.delay) this.speed = this.delay / 2

            elem.style.setProperty(
                '--infosheet-transition-time',
                `${this.speed / 1000}s`
            )
            elem.classList.add('open')
        }, 1)

        this.options.isOpen(this)
        return elem
    }

    close() {
        this.alert.classList.remove('open')

        setTimeout(() => {
            this.alert.remove()
            this.alert.removeEventListener('click', this.close)

            if (!this.wrap.querySelector('.infosheet')) this.wrap.remove()

            this.options.isClose(this)
        }, this.speed)
    }

    #monitorClick = () =>
        this.alert.addEventListener('click', () => this.close())
}
// END alert
