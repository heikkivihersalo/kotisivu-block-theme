import { createReduxStore, register } from '@wordpress/data';

import {
	STORE_NAME as OPTIONS_STORE_NAME,
	STORE_CONFIG as optionsConfig,
} from './options';

const optionsStore = createReduxStore(OPTIONS_STORE_NAME, optionsConfig);
register(optionsStore);
