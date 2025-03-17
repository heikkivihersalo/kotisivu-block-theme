/**
 * Internal dependencies
 */
import { ACTIONS, API_PATH, CONTACT } from './constants';
import type { StoreAction, StoreApiResponse } from '@stores';

/**
 * Handle the store actions
 */
type GetOption = typeof API_PATH;
type SetOption = Partial<typeof CONTACT> | undefined;
type GetAction = StoreAction<typeof ACTIONS.GETTER, GetOption>;
type SetAction = StoreAction<typeof ACTIONS.SETTER, SetOption>;

/**
 * Store type
 */
type Store = Partial<typeof CONTACT> | undefined;

/**
 * Data or API responses
 */
type ApiResponse = StoreApiResponse<typeof CONTACT>;

/**
 * Export default types
 */
export type { SetOption, GetOption, SetAction, GetAction, Store, ApiResponse };
