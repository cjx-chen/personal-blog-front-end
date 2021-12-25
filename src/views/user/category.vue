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
      <div :style="{ background: '#fff', padding: '24px', minHeight: '450px' }">
        <div class="title">
          <book-outlined />
          文章分类
        </div>
        <div class="categories" :data="categories">
          <a-button class="category" v-for="value in categories" :id="value.categoryId" color="blue"
            @click="getBlogs($event)">{{ value.categoryName }}</a-button>
        </div>
        <!-- 文章列表 -->
        <a-row v-if="articleList" class="articleRow" :data="articleList">
          <a-col class="articleCol" :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"
            v-for="value in articleList">
            <a-card :title="value.articleTitle" style="width: 300px">
              <template #extra><a href="#" :id="value.articleId" @click="gotoArticleDetail($event)">
                  <arrow-right-outlined />
                </a></template>
              <p class="articleContent">{{ value.articleContent }}</p>
              <!-- <a-card-meta>
                <template #description>
                  <a-tag class="tag" v-for="value in tags" color="blue">{{ value.tagName }}</a-tag>
                </template>
              </a-card-meta> -->
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Jessie ©2021 Created by 陈家禧 20191002876
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { useRouter } from "vue-router";
  import { message } from 'ant-design-vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

  import axios from '../../utils/axios'

  export default defineComponent({
    name: 'UserCategory',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      ArrowRightOutlined
    },
    setup() {
      const current = ref(['category'])
      const categories = reactive([])
      const articleList = reactive([])
      const tags = reactive([])

      /**
       * 获取某博客所属分类
       */
      const getCategories = () => {
        axios.get('/api/v1/getCategories').then((res) => {
          // message.success('请求成功！');
          console.log(res.data.data)
          const Datas = res.data.data;
          for (let i = 0; i < Datas.length; i++) {
            categories.push(Datas[i])
          }
        })
      }

      /**
       * 获取博客列表
       */
      const getBlogs = (val) => {
        // 获取分类id
        console.log('cId', val.currentTarget.id)
        const cId = val.currentTarget.id
        // 清空文章列表
        articleList.length = 0
        // 获取文章列表
        axios.get(`/api/v1/getPartArticles?cId=${cId}`).then((res) => {
          // message.success('请求成功！');
          console.log(res.data)
          const Datas = res.data.data;
          for (let i = 0; i < Datas.length; i++) {
            articleList.push(Datas[i])
          }
        })
      }

      /**
       * 跳转博客详情页
       */
      const router = useRouter()
      const methods = {
        gotoArticleDetail(e) {
          // console.log(e.currentTarget.id)
          const articleId = e.currentTarget.id
          router.push({
            path: "/articleDetail",
            query: {
              articleid: articleId
            }
          })
        }
      }

      onMounted(() => {
        getCategories()
      })

      return {
        current,
        categories,
        articleList,
        getCategories,
        getBlogs,
        ...methods,
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

  .categories {
    padding: 0 25vw;
    margin-top: 3rem;
    text-align: center;
  }

  .category {
    margin: 0.5rem;
  }

  .articleRow {
    margin-top: 3rem;
  }
  
  .ant-card {
    height: 12rem !important;
  }

  .articleCol {
    margin-top: 1rem;
  }

  .articleContent {
    -webkit-line-clamp: 4;
    /*这里就是行数，想限制多少行就写多少*/
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
</style>