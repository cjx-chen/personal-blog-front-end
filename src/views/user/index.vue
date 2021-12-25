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
    <!-- 轮播图 -->
    <a-carousel autoplay>
      <div class="item1">
        <div>
          <div class="carouselTitle">嘻嘻的妙妙屋</div>
        </div>
      </div>
      <div class="item2">
        <div>
          <div class="carouselTitle">嘻嘻的妙妙屋</div>
        </div>
      </div>
      <div class="item3">
        <div>
          <div class="carouselTitle">嘻嘻的妙妙屋</div>
        </div>
      </div>
    </a-carousel>
    <a-layout-content style="padding: 30px 50px 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '450px' }">
        <!-- 文章列表 -->
        <a-row class="articleRow" :data="articleList">
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
        <!-- 页码 -->
        <!-- <a-pagination class="pagination" v-model:currentPage="currentPage" simple :total="50" /> -->
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
    name: 'UserHome',
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
      const articleList = reactive([])
      const tags = reactive([
        {
          tagid: 1,
          tagName: 'Nodejs'
        },
        {
          tagid: 2,
          tagName: 'Apache'
        }
      ])

      /**
       * 获取博客列表
       */
      const getBlogs = () => {
        articleList.length = 0
        axios.get('/api/v1/getArticles').then((res) => {
          // message.success('请求成功！');
          console.log(res.data.data)
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
        getBlogs()
      })

      return {
        current,
        currentPage,
        articleList,
        tags,
        ...methods,
        getBlogs,
      };
    }
  });
</script>

<style scoped>
  .site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
  }

  #components-layout-demo-top .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .ant-row-rtl #components-layout-demo-top .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  [data-theme='dark'] .site-layout-content {
    background: #141414;
  }

  .logo {
    display: flex;
  }

  .ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 526px;
    line-height: 526px;
    background: #364d79;
    overflow: hidden;
    margin-top: 60px;
  }

  .ant-carousel :deep(.slick-slide .carouselTitle) {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    font-size: 4rem;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .item1 {
    background: url(../../static/img/0.jpg) no-repeat;
    background-size: 100% auto;
  }

  .item2 {
    background: url(../../static/img/1.jpg) no-repeat;
    background-size: 100% auto;
  }

  .item3 {
    background: url(../../static/img/2.jpg) no-repeat;
    background-size: 100% auto;
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

  .ant-pagination {
    text-align: right;
  }

  .pagination {
    margin-top: 2rem;
  }
</style>