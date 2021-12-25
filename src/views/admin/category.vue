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
        <a-button type="primary" size="small" style="margin-left: 1rem;" @click="gotoAdd">新增</a-button>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '475px' }">
        <a-table :columns="columns" :data-source="list.data">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'categoryId'">
              <span>
                ID
              </span>
            </template>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'categoryId'">
              {{ record.categoryId }}
            </template>
            <template v-else-if="column.key === 'action'">
              <span>
                <a-button size="small" :id="record.categoryId" @click="gotoChange($event)">修改</a-button>
                <a-divider type="vertical" />
                <a-button danger size="small" :id="record.categoryId" @click="handleDelete($event)">删除</a-button>
              </span>
            </template>
          </template>
        </a-table>
        <!-- 新增分类 -->
        <a-modal class="add-block" v-model:visible="addvisible" title="新增分类" width="30%" wrap-class-name="full-modal"
          @ok="handleAdd" okText="增加" cancelText="取消">
          <div class="label" style="margin-bottom: 10px;">分类栏目</div>
          <a-textarea v-model:value="add.categoryName" :placeholder="add.categoryName" auto-size />
        </a-modal>
        <!-- 修改分类 -->
        <a-modal class="rewrite-block" v-model:visible="rewritevisible" title="修改分类" width="30%"
          wrap-class-name="full-modal" @ok="handleRewrite" okText="修改" cancelText="取消">
          <div class="label" style="margin-bottom: 10px;">分类栏目</div>
          <a-textarea v-model:value="rewrite.categoryName" :placeholder="rewrite.categoryName" auto-size />
        </a-modal>
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
    name: 'AdminCategory',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined
    },
    setup() {
      const addvisible = ref(false)
      const rewritevisible = ref(false)

      const columns = [{
        name: 'categoryId',
        dataIndex: 'categoryId',
        key: 'categoryId',
      }, {
        title: '分类栏目',
        dataIndex: 'categoryName',
        key: 'categoryName',
      }, {
        title: '操作',
        key: 'action',
      }];

      const list = reactive({
        data: []
      })

      const add = reactive({
        categoryId: '',
        categoryName: '',
        isDeleted: ''
      })

      const rewrite = reactive({
        categoryId: '',
        categoryName: '',
        isDeleted: ''
      })

      /**
       * 获取分类列表
       */
      const getAllCategories = () => {
        list.data.length = 0
        axios.get('/manage-api/v1/getCategories').then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            // message.success('请求成功！')
            const Datas = res.data.data;
            for (let i = 0; i < Datas.length; i++) {
              list.data.push(Datas[i])
            }
          } else {
            message.error('获取分类列表失败！')
          }
        })
      }

      /**
       * 增加分类弹窗
       */
      const gotoAdd = () => {
        addvisible.value = true
      }

      /**
       * 修改分类弹窗
       */
      const gotoChange = e => {
        rewritevisible.value = true
        rewrite.categoryId = e.currentTarget.id
        axios.get(`/manage-api/v1/getCategoryById/${rewrite.categoryId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            const Datas = res.data.data;
            rewrite.categoryName = Datas.categoryName
            rewrite.isDeleted = Datas.isDeleted
          } else {
            message.error('获取分类详情失败！')
          }
        })
      }

      /**
       * 新增分类
       */
       const handleAdd = () => {
        if (add.categoryName.length !== 0) {
          axios.post(`/manage-api/v1/addCategory?categoryName=${add.categoryName}`).then((res) => {
            console.log(res.data)
            const Datas = res.data
            if (Datas.resultCode === 200) {
              message.success('增加成功！')
              getAllCategories()
              add.categoryName = ''
            } else {
              message.error('增加失败！')
            }
          })
        } else {
          message.warning('分类栏目不能为空！')
        }
        addvisible.value = false;
      }

      /**
       * 修改分类
       */
      const handleRewrite = () => {
        if (rewrite.categoryName.length !== 0) {
          const params = {
            categoryId: rewrite.categoryId,
            categoryName: rewrite.categoryName,
          }
          axios.post('/manage-api/v1/changeCategory', params).then((res) => {
            console.log(res.data)
            const Datas = res.data
            if (Datas.resultCode === 200) {
              message.success('修改成功！')
              getAllCategories()
              rewrite.categoryName = ''
            } else {
              message.error('修改失败！')
            }
          })
        } else {
          message.warning('分类栏目不能为空！')
        }
        rewritevisible.value = false;
      }

      /**
       * 删除分类
       */
      const handleDelete = e => {
        console.log(e.currentTarget.id)
        const categoryId = e.currentTarget.id
        axios.post(`/manage-api/v1/deleteCategory?categoryId=${categoryId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            message.success('分类删除成功！')
            getAllCategories()
          } else {
            message.error('分类删除失败！')
          }
        })
      }

      onMounted(() => {
        getAllCategories()
      })

      return {
        selectedKeys: ref(['category']),
        collapsed: ref(false),
        list,
        columns,
        getAllCategories,
        handleDelete,
        gotoAdd,
        gotoChange,
        add,
        addvisible,
        rewrite,
        rewritevisible,
        handleAdd,
        handleRewrite
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
</style>