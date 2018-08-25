import Vue from 'vue'

import router from './router/index'
import AppDemos from './components/AppDemos'

import BaseCharacter from './components/BaseCharacter'
import BaseCharacterPopup from './components/BaseCharacterPopup'

Vue.component(BaseCharacter.name, BaseCharacter);
Vue.component(BaseCharacterPopup.name, BaseCharacterPopup);

var vm = new Vue({
  el: '#container',
  data: {
    demo: null
  },
  components: {
    'app-demos': AppDemos
    // browse: Seshat.Demos.Browse.app
  },
  router: router,
  watch: {
    '$route': function(to, from) {
      // console.log(to)
      // TODO: Remove this code.
      this.demo = to.name
      if (to.name === 'browse' && to.params.cp) {}
    }
  }
})

vm.demo = vm.$route.name