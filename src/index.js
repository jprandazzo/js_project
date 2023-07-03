import Button from "./scripts/button"
import Example from "./scripts/example"
import List from "./scripts/list"
import Issue from "./scripts/issues_chart"
import {getIssuesData,getStateData} from "./scripts/fetch"
import {loadmap} from "./scripts/us_map"

let setColor = function(score) {
    if (score <0) {
        return '#F75B5B'
    } else if (score === 0) {
      return '#989898'
    } else if (score === 1 || score === 1) {
        return '#B3E5A2'
    } else if (score > 1) {
        return '#689D55'
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const title = new Example (document.getElementById("title"))

    const back_button = new Button(document.getElementById("back_button"), 'Go Back', 'none')

    const issues_list = new List(document.getElementById("issues_list"), 'block')
    
    // const state_issues_list = new List(document.getElementById("state_issues_list"), 'none')

    loadmap();
})

// let grapharea = document.getElementById('myChart').getContext('2d');
// let myChart = new Chart(grapharea, {type:'bar'})

let map = document.getElementById('us_map');
let map_bg = document.createElement('div');
map_bg.setAttribute('id','bg_flag');
map.appendChild(map_bg);

getIssuesData()
    .then(data => { 

        data.data.issues.edges.forEach(obj => {
            let li = document.createElement("li");
            li.setAttribute('id',`${obj.node.id}`);
            let textNode = document.createTextNode(obj.node.name)
            li.appendChild(textNode)
            li.addEventListener("click", e => {obj.node.states.forEach(state => {
                let pathId = document.querySelector(`#${state.id}`)
                pathId.setAttribute('data-value',`${state.value}`)
                pathId.setAttribute('data-policy',`${state.policy}`)
                pathId.style.fill = setColor(state.value)
                // debugger
            })
            })
            issues_list.appendChild(li)
        })
        
        // state_issues_list.forEach(obj => {
        //     let list = new List(obj.node, "none")
        //     obj.node.issues.forEach(issue =>{

        //     })
        // })
    })
    .catch(error => {
        // If our fetch was unnsuccessful, here we can handle our error(s)
        console.error('There has been a problem with your fetch operation: ', error);
    });
