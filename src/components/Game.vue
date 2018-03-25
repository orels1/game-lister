<template lang="pug">
  .game
    .stand
      button.completed(:class="clicked && 'clicked-state'" @click="completed")
        .static Mark as completed
        .hover Hooray?
        .clicked Hooray! 🎉
    .info
      .name {{game.name}}
      .overlay
      .background(:style="{ backgroundImage: background }")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    game: Object,
  },
})
export default class Game extends Vue {
  clicked = false;

  get background() { return `url(${this.game.image || ''})`; }

  completed() {
    this.clicked = true;
    setTimeout(() => {
      this.$emit('click');
      this.clicked = false;
    }, 500);
  }
}
</script>

<style scoped>
.game {
  height: 200px;
  width: 300px;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  align-items: center;
}

.stand {
  background: #fcfcfc;
  border-radius: 10px;
  width: 300px;
  box-sizing: border-box;
  padding: 10px;
  height: 100px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column-reverse;
}

.completed {
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  color: #fcfcfc;
  font-weight: 200;
  background: #007AFF;
  border: none;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 150ms ease;
  outline: none !important;
}

.completed.clicked-state {
  background: #FF9500 !important;
  font-weight: bold;
}

.completed:hover {
  background: #3797FF;
}

.completed:active {
  background: #006FE7;
}

.static, .hover, .clicked {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: top 300ms cubic-bezier(.67,.01,.04,.99);
}

.completed:hover .static {
  top: -40px;
}

.completed:hover .hover {
  top: 0;
}

.completed.clicked-state .hover {
  top: -40px !important;
}

.completed.clicked-state .static {
  top: -80px !important;
}

.completed.clicked-state .clicked {
  top: 0 !important;
}

.hover {
  top: 40px;
}

.clicked {
  top: 80px;
}

.info {
  position: absolute;
  z-index: 15;
  background-size: cover;
  background-position: center center;
  width: 280px;
  height: 140px;
  top: 0;
}

.overlay, .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.background {
  background-size: cover;
  background-position: center center;
}
</style>
