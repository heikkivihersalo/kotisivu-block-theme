type StoreAction<T, P> = {
	type: T;
	payload: P;
};

type StoreApiSuccess<D> = {
	type: string;
	message: string;
	status: string;
	data: D;
};

type StoreApiResponse<D> = StoreApiSuccess<D>;
