import Vue from 'vue';
import Vuex from 'vuex';
import { find, findIndex } from 'lodash';
import { users } from 'rawger';

Vue.use(Vuex);

const LOAD_PLAYING = 'LOAD_PLAYING';
const LOAD_BACKLOG = 'LOAD_BACKLOG';
const LOAD_DROPPED = 'LOAD_DROPPED';
const LOAD_PROFILE = 'LOAD_PROFILE';
const REMOVE_GAME = 'REMOVE_GAME';
const DROP_GAME = 'DROP_GAME';

const mockProfile = {
  username: 'orels1',
  slug: 'orels1',
  full_name: 'Anton',
  bio: 'JS dev @x-team by day / game hoarder by night 🎮',
  avatar: 'https://api.rawg.io/media/avatars/009/009.jpg',
  background: 'https://api.rawg.io/media/games/e01/e01bdbcc469cfa43cb0f314d4aae34f6.jpg',
  color: '34323a',
  counters: {
    games: 652,
    collections: 8,
    reviews: 10,
    comments: 4,
    followers: 9,
    following: 2,
  },
  share: 'https://api.rawg.io/api/images/users/af4/af428bc86052d52d8698877d89923ea8_9.jpg',
};

const mockGames = [
  {
    raw: {
      id: 46889,
      slug: 'monster-hunter-world-2',
      name: 'Monster Hunter: World',
      platforms: [
        {
          platform: {
            id: 18,
            name: 'PlayStation 4',
            slug: 'playstation4',
          },
        },
        {
          platform: {
            id: 1,
            name: 'Xbox One',
            slug: 'xbox',
          },
        },
        {
          platform: {
            id: 4,
            name: 'PC',
            slug: 'pc',
          },
        },
      ],
      stores: [
        {
          store: {
            id: 2,
            name: 'Xbox',
            slug: 'xbox',
          },
        },
        {
          store: {
            id: 3,
            name: 'PlayStation',
            slug: 'playstation',
          },
        },
      ],
      metacritic: 0,
      categories: [
        {
          id: 7,
          name: 'Single-player',
          slug: 'single-player',
        },
        {
          id: 49,
          name: 'Multiplayer',
          slug: 'multiplayer',
        },
      ],
      genres: [
        {
          id: 4,
          name: 'Action',
          slug: 'action',
        },
        {
          id: 5,
          name: 'Role-Playing Games (RPG)',
          slug: 'role-playing-games-rpg',
        },
      ],
      released: '2018-01-26',
      dominant_color: '2f3033',
      saturated_color: '8f9f49',
      background_image: 'https://api.rawg.io/media/games/4b2/4b254392d4dadb6c5a7c2caa794b912c.jpg',
      rating_top: 0,
      added: 574,
      user_game: null,
      parent_platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
          },
          selected: false,
        },
        {
          platform: {
            id: 2,
            name: 'PlayStation',
            slug: 'playstation',
          },
          selected: false,
        },
        {
          platform: {
            id: 3,
            name: 'Xbox',
            slug: 'xbox',
          },
          selected: true,
        },
      ],
    },
    image: 'https://api.rawg.io/media/games/4b2/4b254392d4dadb6c5a7c2caa794b912c.jpg',
    name: 'Monster Hunter: World',
    color: '2f3033',
    released: '2018-01-26',
    platforms: [
      'PlayStation 4',
      'Xbox One',
      'PC',
    ],
  },
  {
    raw: {
      id: 50781,
      slug: 'sea-of-thieves',
      name: 'Sea of Thieves',
      platforms: [
        {
          platform: {
            id: 4,
            name: 'PC',
            slug: 'pc',
          },
        },
        {
          platform: {
            id: 1,
            name: 'Xbox One',
            slug: 'xbox',
          },
        },
      ],
      stores: [
        {
          store: {
            id: 2,
            name: 'Xbox',
            slug: 'xbox',
          },
        },
      ],
      metacritic: 0,
      categories: [
        {
          id: 49,
          name: 'Multiplayer',
          slug: 'multiplayer',
        },
      ],
      genres: [
        {
          id: 4,
          name: 'Action',
          slug: 'action',
        },
      ],
      released: '2018-03-20',
      dominant_color: '34323a',
      saturated_color: 'bf7e31',
      background_image: 'https://api.rawg.io/media/games/e01/e01bdbcc469cfa43cb0f314d4aae34f6.jpg',
      rating_top: 0,
      added: 79,
      user_game: null,
      parent_platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
          },
          selected: false,
        },
        {
          platform: {
            id: 3,
            name: 'Xbox',
            slug: 'xbox',
          },
          selected: false,
        },
      ],
    },
    image: 'https://api.rawg.io/media/games/e01/e01bdbcc469cfa43cb0f314d4aae34f6.jpg',
    name: 'Sea of Thieves',
    color: '34323a',
    released: '2018-03-20',
    platforms: [
      'PC',
      'Xbox One',
    ],
  },
  {
    raw: {
      id: 51431,
      slug: 'the-room-old-sins',
      name: 'The Room: Old Sins',
      platforms: [
        {
          platform: {
            id: 3,
            name: 'iOS',
            slug: 'ios',
          },
        },
        {
          platform: {
            id: 21,
            name: 'Android',
            slug: 'android',
          },
        },
      ],
      stores: [
        {
          store: {
            id: 4,
            name: 'App Store',
            slug: 'ios',
          },
        },
      ],
      metacritic: 0,
      categories: [],
      genres: [
        {
          id: 3,
          name: 'Adventure',
          slug: 'adventure',
        },
        {
          id: 7,
          name: 'Puzzle',
          slug: 'puzzle',
        },
      ],
      released: '2018-01-25',
      dominant_color: '192729',
      saturated_color: 'c9a03b',
      background_image: 'https://api.rawg.io/media/games/ac1/ac157870541bc1c4b5a03d5ee528a747.jpg',
      rating_top: 0,
      added: 7,
      user_game: null,
      parent_platforms: [
        {
          platform: {
            id: 4,
            name: 'iOS',
            slug: 'ios',
          },
          selected: true,
        },
        {
          platform: {
            id: 8,
            name: 'Android',
            slug: 'android',
          },
          selected: false,
        },
      ],
    },
    image: 'https://api.rawg.io/media/games/ac1/ac157870541bc1c4b5a03d5ee528a747.jpg',
    name: 'The Room: Old Sins',
    color: '192729',
    released: '2018-01-25',
    platforms: [
      'iOS',
      'Android',
    ],
  },
  {
    raw: {
      id: 28153,
      slug: 'assassins-creed-origins',
      name: 'Assassin\'s Creed Origins',
      platforms: [
        {
          platform: {
            id: 18,
            name: 'PlayStation 4',
            slug: 'playstation4',
          },
        },
        {
          platform: {
            id: 1,
            name: 'Xbox One',
            slug: 'xbox',
          },
        },
        {
          platform: {
            id: 4,
            name: 'PC',
            slug: 'pc',
          },
        },
      ],
      stores: [
        {
          store: {
            id: 2,
            name: 'Xbox',
            slug: 'xbox',
          },
        },
        {
          store: {
            id: 1,
            name: 'Steam',
            slug: 'steam',
          },
        },
        {
          store: {
            id: 3,
            name: 'PlayStation',
            slug: 'playstation',
          },
        },
      ],
      metacritic: 81,
      categories: [
        {
          id: 16,
          name: 'Captions available',
          slug: 'captions-available',
        },
        {
          id: 9,
          name: 'Full controller support',
          slug: 'full-controller-support',
        },
        {
          id: 18,
          name: 'In-App Purchases',
          slug: 'in-app-purchases',
        },
        {
          id: 7,
          name: 'Single-player',
          slug: 'single-player',
        },
        {
          id: 8,
          name: 'Steam Achievements',
          slug: 'steam-achievements',
        },
        {
          id: 10,
          name: 'Steam Trading Cards',
          slug: 'steam-trading-cards',
        },
      ],
      genres: [
        {
          id: 4,
          name: 'Action',
          slug: 'action',
        },
        {
          id: 3,
          name: 'Adventure',
          slug: 'adventure',
        },
        {
          id: 5,
          name: 'Role-Playing Games (RPG)',
          slug: 'role-playing-games-rpg',
        },
      ],
      released: '2017-10-27',
      dominant_color: '352516',
      saturated_color: '5e3f22',
      background_image: 'https://api.rawg.io/media/screenshots/002/002c17e26ed465e8966d29163b61811d.jpg',
      rating_top: 0,
      added: 656,
      user_game: null,
      parent_platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
          },
          selected: false,
        },
        {
          platform: {
            id: 2,
            name: 'PlayStation',
            slug: 'playstation',
          },
          selected: false,
        },
        {
          platform: {
            id: 3,
            name: 'Xbox',
            slug: 'xbox',
          },
          selected: true,
        },
      ],
    },
    image: 'https://api.rawg.io/media/screenshots/002/002c17e26ed465e8966d29163b61811d.jpg',
    name: 'Assassin\'s Creed Origins',
    color: '352516',
    released: '2017-10-27',
    platforms: [
      'PlayStation 4',
      'Xbox One',
      'PC',
    ],
  },
];


const store = new Vuex.Store({
  state: {
    playing: [],
    dropped: [],
    backlog: [],
    profile: {},
  },
  mutations: {
    [LOAD_PLAYING](state, payload) {
      state.playing = payload;
    },
    [LOAD_DROPPED](state, payload) {
      state.dropped = payload;
    },
    [LOAD_BACKLOG](state, payload) {
      state.backlog = payload;
    },
    [LOAD_PROFILE](state, payload) {
      state.profile = payload;
    },
    [REMOVE_GAME](state, id) {
      state.playing.splice(findIndex(state.playing, { raw: { id } }), 1);
    },
    [DROP_GAME](state, id) {
      const game = find(state.backlog, { raw: { id } });
      state.backlog.splice(findIndex(state.backlog, { raw: { id } }), 1);
      state.dropped.push(game);
    },
  },
  actions: {
    async fetchPlaying({ commit }) {
      // const games = (await users('orels1').games()).get();
      const games = mockGames;
      commit(LOAD_PLAYING, games);
    },
    async fetchDropped({ commit }) {
      const games = (await users('orels1').games('dropped')).get();
      commit(LOAD_DROPPED, games);
    },
    async fetchBacklog({ commit }) {
      const games = (await users('orels1').games('toplay')).get();
      commit(LOAD_BACKLOG, games);
    },
    async fetchProfile({ commit }) {
      // const profile = (await users('orels1').profile()).get();
      const profile = mockProfile;
      commit(LOAD_PROFILE, profile);
    },
    removeGame({ commit }, id) {
      commit(REMOVE_GAME, id);
    },
    dropGame({ commit }, id) {
      commit(DROP_GAME, id);
    },
  },
});

export default store;
