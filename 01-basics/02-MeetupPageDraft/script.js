import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 1;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup?.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetupData: null,
    agendaItemIcons,
    agendaItemTitles,
  },

  mounted() {
    this.fetchMeetupData();
  },

  computed: {
    isAgendaEmpty() {
      return this.meetupRecord?.agendaList.length <= 0;
    },

    meetupCoverImage() {
      const defaultCover = {
        '--bg-url': 'var(--default-cover)',
      };
      const meetupCover = {
        '--bg-url': `url('${getMeetupCoverLink(this.meetupRecord)}')`,
      };

      return this.meetupRecord.coverImageId === null
        ? defaultCover
        : meetupCover;
    },

    meetupRecord() {
      if (this.meetupData.length) return;

      const agendaList = this.meetupData.agenda.map((agenda) => {
        return {
          ...agenda,
          iconSrc: `/assets/icons/icon-${agendaItemIcons[agenda.type]}.svg`,
          title: agenda.title || agendaItemTitles[agenda.type],
        };
      });

      const coverImageId = this.meetupData.imageId ?? null;
      const localeDate = this.getMeetupLocaleDate(this.meetupData.date);
      const dateISO = new Date(this.meetupData.date).toISOString();

      return {
        ...this.meetupData,
        coverImageId,
        localeDate,
        dateISO,
        agendaList,
      };
    },
  },

  methods: {
    async fetchMeetupData() {
      const response = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);

      this.meetupData = await response.json();
    },

    getMeetupLocaleDate(datestamp) {
      const date = new Date(datestamp);

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      return date.toLocaleString(navigator.language, options);
    },
  },
});
