const API_PATH = '/kotisivu-block-theme/v1/options/contact' as const;

const ACTIONS = {
	GETTER: 'GET',
	SETTER: 'SET',
} as const;

const CONTACT = {
	name: '',
	address: '',
	zip: '',
	city: '',
	country: '',
	vat: '',
	business_id: '',
	phone: '',
	email: '',
};

export { API_PATH, ACTIONS, CONTACT };
