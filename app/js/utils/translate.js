import R from 'ramda';
import { getIntl } from '@openmrs/react-components';
import exportStore from '../export-store';

const translate = {

  getMessage(msgId, msgDefault) {
    const locale = R.path(['openmrs', 'session', 'locale'], exportStore.getState());
    const translatedMsg = getIntl(locale).formatMessage({
      id: msgId,
      defaultMessage: msgDefault,
    });
    return translatedMsg;
  },
};

export default translate;
