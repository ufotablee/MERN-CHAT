import format from 'date-fns/format'
import isToday from 'date-fns/isToday'

export default createdAt => {
    if (isToday(createdAt)) {
        return format(createdAt, 'HH:mm');
      } else {
        return format(createdAt, 'dd/mm/yyyy');
      }
};