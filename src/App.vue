<template>
  <div id="app">
    <div class="container">
      <div class="search-box">
        <input type="text"
          class="singer-name"
          v-model="searchText"
          placeholder="輸入歌手名稱"
          @keydown.enter="searchItunes(searchText)" />
        <button type="button" class="btn btn-primary" @click="searchItunes(searchText)">查詢</button>
      </div>
      <div class="album-placeholder">
        <div>歌手專輯(輸入歌手後呈現ex.蔡依林)</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { ItunesTypes } from '@/types/ItunesTypes';

export default defineComponent({
  name: 'App',
  setup () {
    const searchText = ref('');
    const albums = reactive<{ data: ItunesTypes }>({ data: {} });

    const searchItunes = async (search: string) => {
      try {
        const value = await fetch(`https://itunes.apple.com/search?term=${search}&entity=album`);
        const valueToJSON = await value.json();
        albums.data = valueToJSON;
      } catch (err) {
        console.log('catch', err);
      }
    }

    return {
      searchText,
      albums,
      searchItunes
    }
  }
})
</script>

<style>
.container {
  max-width: 1400px;
  width: 100%;
  padding: 0 25px;
}

.search-box {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
}

.singer-name {
  display: block;
  width: 200px;
  height: 30px;
  margin: 0 5px 0 0;
}

.btn {
  display: block;
  width: 75px;
  height: 35px;
}

.album-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 15px 0;
}
</style>