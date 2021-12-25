<template>
  <!-- 顶部导航栏 -->
  <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark">
    <a-menu-item key="logo" disabled>
      <template #icon>
        <img src="../../public/egg.png" alt="" width="40" height="40">
      </template>
      Blog | Jessie
    </a-menu-item>
    <a-menu-item key="home">
      <template #icon>
        <home-outlined />
      </template>
      首页
    </a-menu-item>
    <a-menu-item key="tag">
      <template #icon>
        <tags-outlined />
      </template>
      标签
    </a-menu-item>
    <a-menu-item key="category">
      <template #icon>
        <book-outlined />
      </template>
      分类
    </a-menu-item>
    <a-menu-item key="about">
      <template #icon>
        <user-outlined />
      </template>
      关于
    </a-menu-item>
    <!-- <a-menu-item key="alipay">
      <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    </a-menu-item> -->
  </a-menu>
</template>

<script>
  //   import { onMounted, computed } from 'vue'
  // import { useRoute } from 'vue-router'
  // import { useStore } from 'vuex'
  import { defineComponent, ref } from 'vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    // name: 'Index',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      ArrowRightOutlined
    },
    setup() {
      const current = ref(['home']);
      const currentPage = ref(1);
      return {
        current,
        currentPage
      };
    }
  });
</script>

<style scoped>
  .logo {
    display: flex;
  }

  .ant-pagination {
    text-align: center;
  }
</style>