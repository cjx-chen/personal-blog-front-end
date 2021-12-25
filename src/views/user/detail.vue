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
      <div :style="{ background: '#fff', padding: '24px', minHeight: '450px' }" :data="state">
        <div class="articleTitle">
          <strong>{{ state.articleTitle }}</strong>
        </div>
        <div class="articleContent">
          <div>{{ state.articleContent }}</div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Jessie ©2021 Created by 陈家禧 20191002876
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { useRoute } from "vue-router";
  import { message } from 'ant-design-vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

  import axios from '../../utils/axios'

  export default defineComponent({
    name: 'UserArticleDetail',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      ArrowRightOutlined
    },
    setup() {
      const current = ref(['']);
      const route = useRoute()
      const state = reactive({
        articleId: 0,
        articleTitle: '',
        articleContent: ''
      })

      /**
       * 获取文章详情
       */
      const getArticleById = () => {
        const articleId = state.articleId
        console.log(state.articleId)
        axios.get(`/api/v1/getArticle/${articleId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            // message.success('请求成功！')
            const Datas = res.data.data;
            state.articleTitle = Datas.articleTitle
            state.articleContent = Datas.articleContent
            // console.log('state.articleTitle', state.articleTitle)
          } else {
            message.error('获取博客详情失败！')
          }
        })
      }

      onMounted(() => {
        // console.log(route.query.articleid)
        const articleId = route.query.articleid
        // console.log(articleId)
        state.articleId = articleId
        getArticleById()
      })

      return {
        current,
        route,
        state,
        getArticleById
      };
    }
  });
</script>

<style scoped>
  .logo {
    display: flex;
  }

  .articleTitle {
    margin-bottom: 1.5rem;
  }

  .articleTitle strong {
    font-size: 1.5rem;
  }

  .articleContent {
    white-space: pre-wrap;
  }
</style>