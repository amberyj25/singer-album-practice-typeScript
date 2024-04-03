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
        <div>歌手專輯(輸入歌手後呈現 ex.五月天)</div>
      </div>

      <div v-if="!!albums.data.results">
        <div class="row d-flex justify-content-center filter">
          <button type="button" class="btn btn-info col-2 mx-2" @click="getCategory('發行日小到大')">發行日(小到大)</button>
          <button type="button" class="btn btn-warning col-2 mx-2" @click="getCategory('發行日大到小')">發行日(大到小)</button>
        </div>
        <div class="overflow-hidden text-center album">
          <div class="row gy-5">
            <div v-for="(album, index) in albumsData" :key="index" class="col-3">
              <AlbumData :album="album"></AlbumData>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import type { ItunesTypes } from '@/types/ItunesTypes'
import AlbumData from '@/components/AlbumData.vue'
type allCategory = string[];

export default defineComponent({
  name: 'App',
  components: {
    AlbumData
  },
  setup () {
    const searchText = ref('');
    const albums = reactive<{ data: ItunesTypes }>({ data: {} });
    const allCategory = ref<allCategory>(["發行日大到小", "年份"]);
    const category = ref<string>("");

    const searchItunes = async (search: string) => {
      try {
        const value = await fetch(`https://itunes.apple.com/search?term=${search}&entity=album`);
        const valueToJSON = await value.json();
        albums.data = valueToJSON;
      } catch (err) {
        console.log('catch', err);
      };
    };

    const getCategory = (categoryItem: string) => {
      switch (categoryItem) {
        case "發行日大到小":
          category.value = "發行日大到小";
          break;
        case "發行日小到大":
          category.value = "發行日小到大";
          break;
      };
    };

    const albumsData = computed(() => {
      if (!albums.data.results) return;

      if(category.value === "發行日小到大") {
        return albums.data.results.sort((a, b) => parseInt(a.releaseDate) - parseInt(b.releaseDate));
      };

      // default || 發行日大到小
      return albums.data.results.sort((a, b) => parseInt(b.releaseDate) - parseInt(a.releaseDate));
    });

    return {
      searchText,
      albums,
      searchItunes,
      allCategory,
      category,
      getCategory,
      albumsData
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

.album {
  background-color: #78cee0;
  padding: 20px; /* 可根據需要調整 padding 大小 */
  border-radius: 10px; /* 添加圓角邊框 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* 添加陰影效果 */
}
</style>