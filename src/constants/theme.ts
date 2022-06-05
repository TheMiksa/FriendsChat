import AsyncStorage from "@react-native-async-storage/async-storage";

export type Theme = {
  themeType: string,
  primaryBackgroundColor: string,
  secondaryBackgroundColor: string,
  primaryBtnBackgroundColor: string,
  secondaryBtnBackgroundColor: string,
  primaryColor: string,
  secondaryColor: string,
  primaryBorderColor: string,
  secondaryBorderColor: string,
};

export const theme: {
  light: Theme,
  dark: Theme,
} = {
  light: {
    themeType: 'light',
    primaryBackgroundColor: '#EEEEEE',
    secondaryBackgroundColor: '#ABCDEF',
    primaryBtnBackgroundColor: '#E8EEF6',
    secondaryBtnBackgroundColor: '#87B2DD',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    primaryBorderColor: '#000000',
    secondaryBorderColor: '#000000',
  },
  dark: {
    themeType: 'dark',
    primaryBackgroundColor: '#708B72',
    secondaryBackgroundColor: '#808000',
    primaryBtnBackgroundColor: '#527455',
    secondaryBtnBackgroundColor: '#717102',
    primaryColor: '#ABCDEF',
    secondaryColor: '#EEEEEE',
    primaryBorderColor: '#000000',
    secondaryBorderColor: '#000000',
  },
};



