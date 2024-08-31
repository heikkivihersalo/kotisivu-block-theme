import { createContext } from '@wordpress/element';
import { STATUS } from '../constants';

type Status = (typeof STATUS)[keyof typeof STATUS];
type StatusContextType = {
	status: Status;
	setStatus: (status: Status) => void;
};

const StatusContext = createContext<StatusContextType>({
	status: STATUS.INITIAL,
	setStatus: () => {},
});

export type { StatusContextType, Status };
export default StatusContext;
