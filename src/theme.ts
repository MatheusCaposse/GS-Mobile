export interface Colors {
  background: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
}

export const lightColors: Colors = {
  background: '#FFFFFF',
  card: '#F4F5F7',
  text: '#111111',
  muted: '#5F6368',
  border: '#D9DCE1',
  primary: '#0B6E4F',
  primaryText: '#FFFFFF',
  danger: '#B3261E',
};

export const darkColors: Colors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#F2F2F2',
  muted: '#A0A4A8',
  border: '#333333',
  primary: '#3DDC97',
  primaryText: '#08241A',
  danger: '#F2B8B5',
};
