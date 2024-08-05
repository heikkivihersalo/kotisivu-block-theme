import { createContext } from '@wordpress/element';
import { STATUS } from '../constants';
import type { StatusContextType } from '../types';

const StatusContext = createContext<StatusContextType>({
	status: STATUS.INITIAL,
	setStatus: () => {},
});

export default StatusContext;
