<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <!-- 侧边导航栏 -->
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="logo" disabled>
          <template #icon>
            <img src="../../../public/egg.png" alt="" width="40" height="40">
          </template>
          <router-link tag="li" to="home">
            Blog | Jessie
          </router-link>
        </a-menu-item>
        <a-menu-item key="blog">
          <template #icon>
            <home-outlined />
          </template>
          <router-link tag="li" to="blog">
            博客
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
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 0 0 1rem;">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '475px' }">
        <div>
          <span class="label">姓名</span>
          <a-textarea v-model:value="user.userName" :placeholder="user.userName" auto-size />
          <div style="margin: 24px 0" />
          <span class="label">班级</span>
          <a-textarea v-model:value="user.userClass" :placeholder="user.userClass" auto-size />
          <div style="margin: 24px 0" />
          <span class="label">学校</span>
          <a-textarea v-model:value="user.userSchool" :placeholder="user.userSchool" auto-size />
          <div style="margin: 24px 0" />
          <a-button type="primary" block @click="changeUserInfo">修改</a-button>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Jessie ©2021 Created by 陈家禧 20191002876
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

  import axios from '../../utils/axios'

  export default defineComponent({
    name: 'AdminAbout',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined
    },
    setup() {
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
        axios.get(`/manage-api/v1/getUserInfo/${user.userId}`).then((res) => {
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

      /**
       * 修改个人信息
       */
      const changeUserInfo = () => {
        if (user.userName.length !== 0 && user.userClass.length !== 0 && user.userSchool.length !== 0) {
          const params = {
            userId: user.userId,
            userName: user.userName,
            userClass: user.userClass,
            userSchool: user.userSchool
          }
          axios.post('/manage-api/v1/changeUserInfo', params).then((res) => {
            console.log(res.data)
            const Datas = res.data
            if (Datas.resultCode === 200) {
              message.success('修改成功！')
              getUserInfo()
            } else {
              message.error('修改失败！')
            }
          })
        } else {
          message.warning('个人信息不能为空！')
        }
      }

      onMounted(() => {
        getUserInfo()
      })

      return {
        selectedKeys: ref(['about']),
        collapsed: ref(false),
        user,
        getUserInfo,
        changeUserInfo
      };
    }
  });
</script>

<style scoped>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  .label {
    color: grey;
    margin: 0 0 5px 5px;
  }
</style>