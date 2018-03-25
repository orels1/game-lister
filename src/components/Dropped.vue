<template lang="pug">
  .dropped
    h3 dropped
    ul
      li(v-for="game in dropped" :key="game.raw.id")
        .text {{game.name}}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(['fetchDropped']),
  },
  computed: mapState(['dropped']),
})
export default class Dropped extends Vue {
  loaded = false;

  async created() {
    if (this.dropped.length) {
      this.loaded = true;
      return;
    }

    await this.fetchDropped();
    this.loaded = true;
  }
}
</script>

<style scoped>
.dropped {
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

</style>
