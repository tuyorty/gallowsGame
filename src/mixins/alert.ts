import { Notify } from 'quasar';

export const alertMixin = {
  methods: {
    showAlert(
      message: string,
      type: 'positive' | 'negative' | 'warning' | 'info' | 'ongoing' = 'info'
    ) {
      Notify.create({
        message: message,
        type: type,
        position: 'top',
        timeout: 2500,
      });
    },

    showTimeoutAlert(message: string, progress: boolean) {
      Notify.create({
        progress: progress,
        message: message,
        color: 'primary',
        avatar: 'src/assets/avatarHamster.jpg',
        timeout: 4000,
      });
    },
  },
};
