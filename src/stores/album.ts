import { defineStore } from 'pinia';
import type { ItunesTypes } from '@/types/ItunesTypes';

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albumsData: null as ItunesTypes | null
  }),
  actions: {
    setAlbumsData(data: ItunesTypes) {
      this.albumsData = data;
    }
  }
});
