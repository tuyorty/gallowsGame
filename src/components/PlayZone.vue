<template>
  <div class="row flex flex-center q-pa-md border-word">
    <p class="text-h5 q-mb-none">{{ answerArray.join(' ') }}</p>
  </div>
  <div class="row-12 q-mt-md">
    <q-input
      outlined
      :disable="!ingame"
      v-model="letterInput"
      label="Тут угадывать"
      @keyup.enter="checkLetter"
    />
  </div>
  <div class="row q-mt-md flex flex-center">
    <q-btn v-if="!ingame" @click="takeRandomWord()" size="xl" label="Играть" />
  </div>
  <div v-if="ingame" class="row q-mt-md flex flex-wrap alphabet-container">
    <q-btn
      v-for="(letter, index) in alphabet"
      :key="index"
      @click="selectLetter(letter)"
      :label="letter"
      :disable="usedLetters.includes(letter.toLowerCase())"
      :class="{ 'crossed-out': usedLetters.includes(letter.toLowerCase()) }"
      size="sm"
    />
  </div>
  <div class="row" style="position: absolute; bottom: 18%; right: 31%">
    <img
      v-for="(image, index) in images"
      :key="index"
      :src="image"
      style="width: 25px; height: 25px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PlayZone',

  emits: ['wrong-letter', 'start-game'],

  data() {
    return {
      letterInput: '' as string,
      wordsLib: [
        ['Документ', 'Важная бумага'],
        ['Антивирус', 'Защищает компьютер'],
        ['Электрон', 'Отрицательный заряд'],
        ['Ноутбук', 'Портативный компьютер'],
        ['Табуретка', '4 ножки'],
        ['Оса', 'Полосатая'],
        ['Поршень', 'Внутри двигателя'],
        ['Интроверт', 'Необщительный человек'],
        ['Кулебяка', 'Пирожок'],
        ['Автомобиль', 'Четыре колеса'],
        ['Книга', 'Содержит истории'],
        ['Солнце', 'Дает свет днем'],
        ['Море', 'Большой водоем'],
        ['Гора', 'Высокая земля'],
        ['Лес', 'Много деревьев'],
        ['Океан', 'Самый большой водоем'],
        ['Самолет', 'Летит по воздуху'],
        ['Телефон', 'Для звонков'],
        ['Компьютер', 'Для работы'],
        ['Солдат', 'Военный человек'],
        ['Пианино', 'Музыкальный инструмент'],
        ['Ракета', 'Летит в космос'],
        ['Звезда', 'Светит в ночи'],
        ['Луна', 'Светит ночью'],
      ] as [string, string][],
      randomWord: '' as string,
      helpWord: '' as string,
      randomWordNumber: 0 as number,
      answerArray: [] as string[],
      remainigLetters: 0 as number,
      guess: '' as string,
      ingame: false as boolean,
      heart: 0 as number,
      images: Array(6).fill('src/assets/heart.svg'),
      alphabet: [
        'А',
        'Б',
        'В',
        'Г',
        'Д',
        'Е',
        'Ё',
        'Ж',
        'З',
        'И',
        'Й',
        'К',
        'Л',
        'М',
        'Н',
        'О',
        'П',
        'Р',
        'С',
        'Т',
        'У',
        'Ф',
        'Х',
        'Ц',
        'Ч',
        'Ш',
        'Щ',
        'Ъ',
        'Ы',
        'Ь',
        'Э',
        'Ю',
        'Я',
      ],
      usedLetters: [] as string[],
    };
  },

  methods: {
    takeRandomWord() {
      this.randomWordNumber = Math.floor(Math.random() * this.wordsLib.length);
      this.randomWord = this.wordsLib[this.randomWordNumber][0].toLowerCase();
      this.helpWord = this.wordsLib[this.randomWordNumber][1].toLowerCase();

      this.ingame = true;
      this.heart = 0;
      this.$emit('start-game', this.helpWord);

      this.generateArray();
      this.resetImages();
      this.usedLetters = [];
    },

    generateArray() {
      this.answerArray = Array(this.randomWord.length).fill('_');
      this.remainigLetters = this.randomWord.length;
    },

    resetImages() {
      this.images = Array(6).fill('src/assets/heart.svg');
    },

    checkLetter() {
      this.guess = this.letterInput.toLowerCase();

      if (!this.guess || this.guess.length !== 1) {
        alert('Родной, не нервничай. Вводи одну буковку');
        this.letterInput = '';
        return;
      }

      this.processLetter(this.guess);
    },

    selectLetter(letter: string) {
      this.guess = letter.toLowerCase();
      this.processLetter(this.guess);
    },

    processLetter(letter: string) {
      if (this.answerArray.includes(letter)) {
        alert('Доброе утро! Такая буква уже открыта');
        this.letterInput = '';
        return;
      }

      if (this.usedLetters.includes(letter)) {
        alert('Эту буковку ты уже пробовал');
        this.letterInput = '';
        return;
      }

      this.usedLetters.push(letter);

      let found = false;
      for (let j = 0; j < this.randomWord.length; j++) {
        if (this.randomWord[j] === letter) {
          this.answerArray[j] = letter;
          this.remainigLetters--;
          found = true;
        }
      }

      if (!found) {
        alert('Не расстраивайся, такой буковки нету. Попробуй еще разик');
        this.heart++;
        this.$emit('wrong-letter');
        this.images[this.heart - 1] = 'src/assets/heartBroken.svg';

        if (this.heart > 5) {
          alert('Ты проиграл :(');
          this.ingame = false;
        }
      }

      this.letterInput = ''; // очищаем поле ввода

      if (this.remainigLetters === 0) {
        this.ingame = false;
        alert('Молодец, ты победил!');
      }
    },
  },
});
</script>

<style scoped lang="scss">
.border-word {
  background-color: rgba(128, 128, 128, 0); /* полупрозрачный серый фон */
  border: 1px solid rgba(57, 57, 57, 0.5); /* менее прозрачный контур */
  border-radius: 6px; /* закругленные углы */
  height: 15%;
}

.alphabet-container {
  max-width: 300px;
  justify-content: center;
}

.crossed-out {
  color: red;
}
</style>
