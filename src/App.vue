<template lang="pug">
  #app
    deck
    .wrapper
      .switches
        router-link(to="/" activeClass="active" exact)
          h2 Backlog
        .switch-separator /
        router-link(to="/dropped" activeClass="active")
          h2 Dropped
      transition(name="route" mode="out-in")
        router-view.route
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import deck from '@/components/Deck';

@Component({
  components: {
    deck,
  },
  methods: {
    ...mapActions(['fetchPlaying', 'fetchProfile']),
  },
  computed: mapState(['playing', 'profile']),
})
export default class App extends Vue {
  async created() {
    try {
      if (this.playing.length > 0 && Object.keys(this.profile).length > 0) {
        this.loaded = true;
        return;
      }
      await this.fetchPlaying();
      await this.fetchProfile();
      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  width: 100%;
}

.wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.switches {
  display: flex;
}

.switches a {
  text-decoration: none;
  color: rgba(0,0,0,.4);
}

.switches h2 {
  font-weight: 200;
  transition: color 300ms ease;
}

.switches a.active h2 {
  font-weight: bold;
  color: rgba(0,0,0,1);
}

.switches a:hover h2 {
  color: rgba(0,0,0,1);
}

.switch-separator {
  margin: 0.83em 10px;
  font-size: 1.5em;
  font-weight: bold;
}

h2 {
  text-align: left;
  text-transform: uppercase;
}

.route {
  transition: all 300ms cubic-bezier(0.67, 0.01, 0.04, 0.99);
  transform: translateY(0px);
}

.route-enter, .route-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>

<style>
body {
  margin: 0 !important;
  padding: 0;
}
</style>

