import React, { FC, createContext, useContext, PropsWithChildren } from 'react';
import locale from './translations/en.json';

interface Translations {
  [key: string]: string
}

export interface LocaleContextValue {
  language: string;
  translations: Translations;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({ ...locale, t: (key: string) => key });

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const translations: Translations = locale.translations;
  const t = (key: string) => translations[key] ?? `{{${key}}}`;

  return (
    <LocaleContext.Provider value={{ ...locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext<LocaleContextValue>(LocaleContext);
