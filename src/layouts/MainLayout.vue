<template>
  <div class="flex flex-center bg-gradient">
    <div class="custom-container shadow-6">
      <div class="q-pa-md example-row-equal-width">
        <div class="row flex flex-center">
          <p class="text-weight-thin text-h4">Виселица!</p>
        </div>
        <div class="row">
          <div class="col-7">
            <CardGallows
              :title="IconGallowsOpt[currentIndexCard].title"
              :icon="IconGallowsOpt[currentIndexCard].icon"
              :hint="currentHint"
            />
          </div>
          <div class="col-5">
            <PlayZone
              @wrong-letter="handleWrongLetter"
              @start-game="startGame"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardGallows, { IconLink } from 'src/components/CardGallows.vue';
import PlayZone from 'src/components/PlayZone.vue';
import { alertMixin } from 'src/mixins/alert';

const IconGallows: IconLink[] = [
  {
    title: 'allGood',
    icon: '/src/assets/allGood.png',
  },
  {
    title: 'firstProblem',
    icon: '/src/assets/firstProblem.png',
  },
  {
    title: 'moreProblem',
    icon: '/src/assets/moreProblem.png',
  },
  {
    title: 'bigProblem',
    icon: '/src/assets/bigProblem.png',
  },
  {
    title: 'gallowsReady',
    icon: '/src/assets/gallowsReady.png',
  },
  {
    title: 'sadBoy',
    icon: '/src/assets/sadBoy.png',
  },
  {
    title: 'theEnd',
    icon: '/src/assets/theEnd.png',
  },
];

export default defineComponent({
  name: 'MainLayout',
  mixins: [alertMixin],

  components: {
    CardGallows,
    PlayZone,
  },

  data() {
    return {
      IconGallowsOpt: IconGallows,
      currentIndexCard: 0,
      currentHint: '',
    };
  },

  methods: {
    handleWrongLetter() {
      if (this.currentIndexCard < this.IconGallowsOpt.length - 1) {
        this.currentIndexCard++;
      }
    },

    startGame(hint: string) {
      this.currentIndexCard = 0;
      this.currentHint = hint;
      this.showAlert('Родной, желаю тебе удачи!', 'positive');
    },
  },
});
</script>

<style scoped lang="scss">
.custom-container {
  background-color: rgba(128, 128, 128, 0.3); /* полупрозрачный серый фон */
  border: 2px solid rgba(128, 128, 128, 0.8); /* менее прозрачный контур */
  border-radius: 15px; /* закругленные углы */
  width: 50%;
  height: 70%;
  display: flex;
}

.example-row-equal-width {
  .row > div {
    padding: 10px 15px;
  }

  .row + .row {
    margin-top: 1rem;
  }
}

.bg-gradient {
  margin: 0;
  padding: 0;
  width: 100vw; /* 100% ширины экрана */
  height: 100vh; /* 100% высоты экрана */
  font-family: 'Comic Sans MS', cursive, sans-serif;
  background-image: linear-gradient(
    to right,
    #1abc9c,
    #16a085,
    #2ecc71,
    #27ae60,
    #3498db,
    #2980b9,
    #9b59b6
  );
  background-size: 400%;
  animation: bganimation 20s infinite;
}

@keyframes bganimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
