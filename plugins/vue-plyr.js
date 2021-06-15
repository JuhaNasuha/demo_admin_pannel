import Vue from 'vue'
import VuePlyr from 'vue-plyr/dist/vue-plyr.ssr.js'
import 'vue-plyr/dist/vue-plyr.css'
import JsonViewer from 'vue-json-viewer'
import VueDraggableResizable from 'vue-draggable-resizable'
import { Drag, Drop } from 'vue-drag-drop';
 
Vue.component('drag', Drag); 
Vue.component('drop', Drop);

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
 
// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {}
})