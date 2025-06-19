import {createContentStore} from './factories/createContentStore';
import {fetchLicenses} from '@/api/contentApi';
import type {License} from '@/types';

export const useLicensesStore = createContentStore<License[]>('licenses', fetchLicenses);