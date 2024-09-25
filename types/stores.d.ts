declare module '@stores' {
	export type StoreAction<T, P> = {
		type: T;
		payload: P;
	};

	export type StoreApiSuccess<D> = {
		type: string;
		message: string;
		status: string;
		data: D;
	};

	export type StoreApiResponse<D> = StoreApiSuccess<D>;
}
