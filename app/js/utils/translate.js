import R from 'ramda';
import { getIntl } from '@openmrs/react-components';
import exportStore from '../export-store';

const translate = {

  getLocale() {
    return R.path(['openmrs', 'session', 'locale'], exportStore.getState());
  },

  getMessage(msgId, msgDefault) {
    const locale = translate.getLocale();
    const translatedMsg = getIntl(locale).formatMessage({
      id: msgId,
      defaultMessage: msgDefault,
    });
    return translatedMsg;
  },
};

export default translate;
