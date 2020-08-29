import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export const ChangeLanguage = () => {
    const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div>
          <Trans i18nKey="hello_key" />
          <div>
            <button onClick={() => changeLanguage('es')}>ES</button>
            <button onClick={() => changeLanguage('en')}>en</button>
        </div>
      </div>
  )

}