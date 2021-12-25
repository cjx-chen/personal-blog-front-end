<template>
  <a-layout class="layout">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <!-- 顶部导航栏 -->
      <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark">
        <a-menu-item key="logo" disabled>
          <template #icon>
            <img src="../../../public/egg.png" alt="" width="40" height="40">
          </template>
          <router-link tag="li" to="home">
            Blog | Jessie
          </router-link>
        </a-menu-item>
        <a-menu-item key="home">
          <template #icon>
            <home-outlined />
          </template>
          <router-link tag="li" to="home">
            首页
          </router-link>
        </a-menu-item>
        <a-menu-item key="tag">
          <template #icon>
            <tags-outlined />
          </template>
          <router-link tag="li" to="tag">
            标签
          </router-link>
        </a-menu-item>
        <a-menu-item key="category">
          <template #icon>
            <book-outlined />
          </template>
          <router-link tag="li" to="category">
            分类
          </router-link>
        </a-menu-item>
        <a-menu-item key="about">
          <template #icon>
            <user-outlined />
          </template>
          <router-link tag="li" to="about">
            关于
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 80px 50px 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '450px' }">
        <div class="title">
          <tags-outlined />
          文章标签
        </div>
        <div class="tags" :data="tags">
          <a-tag class="tag" v-for="value in tags" color="blue">{{ value.tagName }}</a-tag>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Jessie ©2021 Created by 陈家禧 20191002876
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive } from 'vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'UserTag',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      ArrowRightOutlined
    },
    setup() {
      const current = ref(['tag']);
      const tags = reactive([
        {
          tagid: 1,
          tagName: 'Nodejs'
        },
        {
          tagid: 2,
          tagName: 'Apache'
        },        
        {
          tagid: 3,
          tagName: 'Html'
        },
        {
          tagid: 4,
          tagName: 'CSS'
        },
        {
          tagid: 5,
          tagName: 'Javascript'
        },
        {
          tagid: 6,
          tagName: 'Java'
        },
      ])

      return {
        current,
        tags
      };
    }
  });
</script>

<style scoped>
  .logo {
    display: flex;
  }

  .title {
    margin-top: 1rem;
    text-align: center;
    font-size: larger;
  }

  .tags {
    padding: 0 25vw;
    margin-top: 3rem;
    text-align: center;
  }

  .tag {
    margin: 0.5rem;
  }
</style>