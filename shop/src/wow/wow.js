import WOW from 'wowjs';

export const initWow = () => {
  const wow = new WOW.WOW({
    live: false,
    mobile: false,
  });
  wow.init();
};