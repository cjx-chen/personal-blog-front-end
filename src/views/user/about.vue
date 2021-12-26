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
        <a-descriptions title="博主信息" :data="user">
          <a-descriptions-item label="姓名">{{ user.userName }}</a-descriptions-item>
          <br />
          <a-descriptions-item style="float: right;">
            <div class="articleNum">
              <span class="title">文章</span>
              <span class="num">78</span>
            </div>
            <div class="categoryNum">
              <span class="title">分类</span>
              <span class="num">10</span>
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="班级">{{ user.userClass }}</a-descriptions-item>
          <br />
          <br />
          <a-descriptions-item label="学校">
            {{ user.userSchool }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Jessie ©2021 Created by 陈家禧 20191002876
    </a-layout-footer>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

  import axios from '../../utils/axios'

  export default defineComponent({
    name: 'UserAbout',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      ArrowRightOutlined
    },
    setup() {
      const current = ref(['about']);

      const user = reactive({
        userId: 1,
        userName: '',
        userClass: '',
        userSchool: ''
      })

      /**
       * 获取个人信息
       */
      const getUserInfo = () => {
        axios.get(`/api/v1/getUserInfo/${user.userId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            const Datas = res.data.data;
            user.userName = Datas.userName
            user.userClass = Datas.userClass,
              user.userSchool = Datas.userSchool
          } else {
            message.error('获取个人信息失败！')
          }
        })
      }

      onMounted(() => {
        getUserInfo()
      })

      return {
        current,
        user,
        getUserInfo
      };
    }
  });
</script>

<style scoped>
  .logo {
    display: flex;
  }

  .title {
    color: gray;
    margin-right: 5px;
  }

  .num {
    color: blue;
    margin-right: 10px;
  }
</style>