<template>
    <div class="album">
      <div class="album-name">{{ album.collectionName }}</div>
      <div class="album-img-box">
        <img :src="album.artworkUrl100" alt="img" class="album-img"/>
      </div>
      <div>{{ year(album.releaseDate) }}年發行</div>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
    name: 'AlbumData',
    props: {
      album: {
        type: Object,
        required: true
      }
    },
    setup () {
      const year = (date: string) => {
        return date.slice(0, 4)
      }
      return { year }
    }
  })
  </script>
  
  <style>
  .album {
    margin: 15px;
  }
  .album-name-title {
    font-size: 16px;
  }
  .album-name {
    height: 28px;
    font-size: 16px;
  }
  .album-img-box {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .album-img {
    width: 125px;
    height: 100px;
  }
  </style>
  