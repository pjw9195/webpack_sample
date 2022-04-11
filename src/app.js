import './app.css'
import defaultImage from "./default-image.jpg"
document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML =`<img src="${defaultImage}" />`

} )

console.log(process.env.NODE_ENV)
