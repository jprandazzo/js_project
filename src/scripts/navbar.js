export default class Navbar {
    constructor(ele) {
        this.ele = ele;

        this.createLI = this.createLI.bind(this);
        
        this.createLI('Issue Map')
        this.createLI('Resources')
        this.createLI('i')
    }

    createLI(item) {
        let li = document.createElement('li')
        li.setAttribute('id',makeSnakeCase(item))
        li.appendChild(document.createTextNode(item))
        // debugger
        this.ele.appendChild(li)

        function makeSnakeCase(text) {
            return text.split(' ').map(el => el.toLowerCase()).join('_')
        }
    }
}