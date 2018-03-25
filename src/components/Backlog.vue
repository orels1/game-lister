<template lang="pug">
  .backlog
    h3 backlog
    transition-group(
      tag="ul"
      v-if="backlog.length"
      name="backlog"
    )
      li(v-for="game in backlog" :key="game.raw.id")
        .text {{game.name}}
        .controls
          button.drop(@click="dropGame(game.raw.id)") Drop the game
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(['fetchBacklog', 'dropGame']),
  },
  computed: mapState(['backlog']),
})
export default class Backlog extends Vue {
  loaded = false;

  async created() {
    if (this.backlog.length) {
      this.loaded = true;
      return;
    }

    await this.fetchBacklog();
    this.loaded = true;
  }
}
</script>

<style scoped>
.backlog {
  margin: 40px 0;
}

h3 {
  text-align: left;
  text-transform: uppercase;
}

ul {
  list-style: none;
  box-shadow: 0 10px 20px rgba(0,0,0,.1);
  margin: 10px 0;
  padding: 0;
  border-radius: 10px;
}

ul li {
  text-align: left;
  display: flex;
  border-top: 1px solid rgba(0,0,0,.1);
  justify-content: space-between;
  transition: all 300ms ease-in-out;
}

ul li:first-of-type {
  border-top: none;
}

.text {
  padding: 10px 15px;
}

.controls {
  border-left: 1px solid rgba(0,0,0,.1);
  padding: 10px 15px;
}

.drop {
  border: none;
  border-radius: 5px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  padding: 0 15px;
  background: rgb(175, 39, 32);
  transition: all 150ms ease;
  cursor: pointer;
}

.drop:hover {
  background: #FF3B30
}

.backlog-enter, .backlog-leave-to {
  opacity: 0;
  height: 0;
}

.backlog-leave-active {
  position: absolute;
  width: 100%;
}

</style>
