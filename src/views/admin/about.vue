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
          <a-textarea v-model:value="userName" placeholder="Autosize height based on content lines" auto-size />
          <div style="margin: 24px 0" />
          <span class="label">班级</span>
          <a-textarea v-model:value="className" placeholder="Autosize height based on content lines" auto-size />
          <div style="margin: 24px 0" />
          <span class="label">地址</span>
          <a-textarea v-model:value="address" placeholder="Autosize height based on content lines" auto-size />
          <div style="margin: 24px 0" />
          <a-button type="primary" block>修改</a-button>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Jessie ©2021 Created by 陈家禧 20191002876
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive } from 'vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

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


      return {
        selectedKeys: ref(['about']),
        collapsed: ref(false),
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