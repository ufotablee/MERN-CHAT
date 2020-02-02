import React from 'react';
import distanceInWordsToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'

const Time = ({date}) => (
    <>
    {distanceInWordsToNow(date, {addSuffix: true, locale: ruLocale})}
    </>
)


export default Time;