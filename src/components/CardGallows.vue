<template>
  <q-card
    class="my-card"
    flat
    style="
      background-color: rgba(128, 128, 128, 0);
      border-radius: 15px;
      height: max-content;
    "
  >
    <img :src="icon" alt="" style="width: 90%" />

    <q-card-section>
      <div class="text-h6">Главное не сдаваться!</div>
      <div class="text-subtitle2">
        {{ 'Но если нужна подсказка :)' }}
      </div>
    </q-card-section>

    <q-card-actions class="q-pt-none">
      <q-btn @click="handelHint" label="Хочу подсказку" flat />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface IconLink {
  title: string;
  icon?: string;
}

export default defineComponent({
  name: 'CardGallows',

  props: {
    title: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: '',
    },

    hint: {
      type: String,
      required: true,
    },
  },

  methods: {
    handelHint() {
      alert(this.hint);
    },
  },
});
</script>
