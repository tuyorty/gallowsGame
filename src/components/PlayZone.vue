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
import { alertMixin } from 'src/mixins/alert';

export default defineComponent({
  name: 'PlayZone',
  mixins: [alertMixin],

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
        ['Карандаш', 'Пишет на бумаге'],
        ['Соль', 'Для приправы'],
        ['Снег', 'Холодный белый'],
        ['Лук', 'Овощ для салата'],
        ['Молоко', 'Из коровы'],
        ['Кофе', 'Пьют с утра'],
        ['Чай', 'Зеленый или черный'],
        ['Сахар', 'Сладкий'],
        ['Хлеб', 'Всему голова'],
        ['Мясо', 'Из животных'],
        ['Рыба', 'Плавает в воде'],
        ['Яблоко', 'Это ведь золотое ...'],
        ['Банан', 'Любят макаки'],
        ['Апельсин', 'Цитрус'],
        ['Груша', 'Фрукт, но не яблоко'],
        ['Виноград', 'Его любят топтать'],
        ['Морковь', 'Полезна для зубов'],
        ['Картофель', 'Петр 1 спасибо'],
        ['Помидор', 'Сок с ним ужасен'],
        ['Огурец', 'Кьюкьюмбер'],
        ['Капуста', 'В ней рождаются'],
        ['Свекла', 'Борщ был бы не борщ без нее'],
        ['Репа', 'Её чешут'],
        ['Чеснок', 'Для аромата'],
        ['Перец', 'Острая штучка'],
        ['Баклажан', 'Лада седан!?'],
        ['Кабачок', 'Вкусная оранжевая субстанция'],
        ['Тыква', 'Превратилась в карету'],
        ['Манго', 'Заморский желтый фрукт'],
        ['Киви', 'Шершавая кожура'],
        ['Персик', 'Ребенок тех кто воевал против Спартанцев'],
        ['Абрикос', 'На юге рос'],
        ['Слива', 'Спелая садовая'],
        ['Вишня', 'Костлявая внутри'],
        ['Клубника', 'Ягода с усами'],
        ['Черника', 'Ягода растет в лесах'],
        ['Ежевика', 'Езжи, брат (ягода)'],
        ['Голубика', 'Ягода продается в пятёрочке весь год'],
        ['Малина', 'Эта сучка пахнет как ...'],
        ['Клюква', 'Ягода растет на болотах'],
        ['Облепиха', 'Чай из нее просто вышак'],
        ['Рябина', 'Гроздями на снегу'],
        ['Шиповник', 'Не соберешь не уколовшись '],
        ['Земляника', 'Мини ягода с усами'],
        ['Арбуз', 'Самый сок в августе'],
        ['Дыня', 'Не арбуз'],
        ['Ананас', 'В банках кольцами или кусочками'],
        ['Гранат', 'Ложись!!!(фрукт)'],
        ['Инжир', 'Смоко́вница обыкнове́нная'],
        ['Финик', 'Машина (ягода)'],
        ['Дуриан', 'Колючий фрукт'],
        ['Маракуйя', 'Фрукт, плод ряда тропических лиан'],
        ['Папайя', 'Заморская дыня'],
        ['Лимон', 'Делает кислые мины'],
        ['Лайм', 'Текила, соль, ...'],
        ['Грейпфрут', 'Розовый фрукт'],
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
      this.helpWord = this.wordsLib[this.randomWordNumber][1];

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

      if (
        this.guess.length === this.randomWord.length &&
        this.guess !== this.randomWord
      ) {
        this.showAlert('Попытка хороша, но не удачна', 'warning');
        this.decreaseHeart(false);
        this.letterInput = '';
        return;
      }
      if (this.guess === this.randomWord) {
        this.ingame = false;
        this.showAlert('Молодец, ты победил!', 'positive');
        this.letterInput = '';
        this.openWord(this.guess);
        return;
      }

      if (!this.guess || this.guess.length !== 1) {
        this.showAlert('Родной, не нервничай. Вводи одну буковку', 'warning');
        this.letterInput = '';
        return;
      }

      this.processLetter(this.guess);
    },

    openWord(word: string) {
      this.answerArray = word.split('');
    },

    selectLetter(letter: string) {
      this.guess = letter.toLowerCase();
      this.processLetter(this.guess);
    },

    processLetter(letter: string) {
      if (this.answerArray.includes(letter)) {
        this.showAlert('Доброе утро! Такая буква уже открыта', 'warning');
        this.letterInput = '';
        return;
      }

      if (this.usedLetters.includes(letter)) {
        this.showAlert('Эту буковку ты уже пробовал', 'warning');
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

      this.decreaseHeart(found);
      if (!found) {
        this.showAlert(
          'Не расстраивайся, такой буковки нету. Попробуй еще разик',
          'warning'
        );
      }

      this.letterInput = '';

      if (this.remainigLetters === 0) {
        this.ingame = false;
        this.showAlert('Молодец, ты победил!', 'positive');
      }
    },

    decreaseHeart(found: boolean) {
      if (found) {
        return;
      }

      this.heart++;
      this.$emit('wrong-letter');
      this.images[this.heart - 1] = 'src/assets/heartBroken.svg';

      if (this.heart > 5) {
        this.showAlert('Ты проиграл :(', 'negative');
        this.ingame = false;
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
