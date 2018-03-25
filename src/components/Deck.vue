<template lang="pug">
  .deck
    .wrapper
      h2 Your deck
      transition-group.games-list(
        v-if="playing.length > 0"
        name="games"
        tag="div"
        :css="false"
        @before-enter="gameBeforeEnter"
        @enter="gameEnter"
        @leave="gameLeave"
        appear
      )
        game.games-item(
          v-for="(game, index) in playing"
          :key="game.raw.id"
          :game="game"
          @click="removeGame(game.raw.id)"
          :data-index="index"
        )
    .overlay
    .background(:style="{backgroundImage: background}")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import Velocity from 'velocity-animate';
import game from './Game';

@Component({
  components: {
    game,
  },
  methods: {
    ...mapActions(['removeGame']),
  },
  computed: mapState(['profile', 'playing']),
})
export default class Deck extends Vue {
  easing = [0.67, 0.01, 0.04, 0.99];
  /* eslint-disable class-methods-use-this */
  get background() { return `url(${this.profile.background || ''})`; }

  gameBeforeEnter(el) {
    /* eslint-disable no-param-reassign */
    el.style.opacity = 0;
    el.style.translateY = '240px';
    /* eslint-enable no-param-reassign */
  }

  gameEnter(el, done) {
    const delay = el.dataset.index * 300;
    setTimeout(() => {
      Velocity(
        el,
        { opacity: [1, 'ease-in'], translateY: ['0px', this.easing] },
        { complete: done },
      );
    }, delay);
  }

  gameLeave(el, done) {
    const delay = el.dataset.index * 300;
    setTimeout(() => {
      Velocity(
        el,
        { opacity: [0, 'ease-out'], translateY: ['240px', this.easing] },
        { complete: done },
      );
    }, delay);
  }
}
</script>

<style scoped>
.deck {
  width: 100%;
  min-height: 300px;
  background-color: #282C35;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.wrapper {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 10;
}

h2 {
  text-align: left;
  color: #fcfcfc;
  text-transform: uppercase;
}

.games-list {
  display: grid;
  width: 100%;
  grid-auto-columns: 300px;
  grid-auto-rows: 200px;
  grid-auto-flow: column;
  grid-gap: 20px;
  height: 200px;
}

.overlay, .background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.overlay {
  z-index: 5;
  background: linear-gradient(to bottom, rgba(0,0,0,0.39) 0%, rgba(0,0,0,0.73) 100%);
}

.background {
  z-index: 2;
  background-size: cover;
  background-position: top center;
}


</style>
