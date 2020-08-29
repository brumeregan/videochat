import React from 'react';
import {useTranslation} from 'react-i18next';

export const Inner = () => {
    const {t} = useTranslation()
    return (
    <div>{t('inner_key')}</div>
    )
}