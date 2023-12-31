import { DefaultTheme } from 'styled-components/dist/types';

const light: DefaultTheme = {
  colors: {
    neutral: {
      10: '#FFFFFF',
      20: '#F9F9FC',
      30: '#e8e8ea',
      40: '#c2c2c7',
      50: '#8E8E92',
      60: '#68686A',
      70: '#444446',
      80: '#212123',
      90: '#1B1B1C',
      100: '#000000',
    },
    primary: {
      40: '#62aed0',
      50: '#2391c2',
    },
    success: {
      50: '#00925E',
    },
    warning: {
      50: '#F0A25B',
    },
    error: {
      50: '#DB555A',
    },
  },
  space: {
    xs: '6px',
    s: '12px',
    m: '18px',
    l: '24px',
  },
};

export default light;
