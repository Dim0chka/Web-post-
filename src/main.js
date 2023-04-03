import { createApp } from 'vue'
import App from './App'
import components from "@/components/UI"
import './assets/tailwind.css'

const app = createApp(App)

components.forEach(component => {
    //  App<Element>.component(name: string, component: Component) 
    app.component(component.name, component)
})

app.mount('#app')
