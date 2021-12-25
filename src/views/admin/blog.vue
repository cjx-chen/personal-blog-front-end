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
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item :key="current">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-menu-item>
          <a-menu-item key="posted" @click="getAllPostedBlogs">
            <template #icon>
              <audit-outlined />
            </template>
            已发布
          </a-menu-item>
          <a-menu-item key="write">
            <template #icon>
              <edit-outlined />
            </template>
            写博客
          </a-menu-item>
          <a-menu-item key="bin" @click="getAllDeteledBlogs">
            <template #icon>
              <delete-outlined />
            </template>
            回收站
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '475px' }">
        <!-- 已发布 -->
        <div class="posted-block" v-if='current == "posted"'>
          <div class="msg" v-if="articleList.length == 0">还没有发布博客哦~</div>
          <a-row class="articleRow" :data="articleList">
            <a-col class="articleCol" :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"
              v-for="value in articleList">
              <a-card :title="value.articleTitle" style="width: 300px">
                <template #extra><a href="#" :id="value.articleId" @click="getBlogDetail($event)">
                    <arrow-right-outlined />
                  </a></template>
                <p class="articleContent">{{ value.articleContent }}</p>
                <a-card-meta>
                  <template #description>
                    <a-tag class="category" v-for="value in categoryList" color="blue">{{ value.categoryName }}</a-tag>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <!-- 已发布博客详情 -->
        <a-modal class="detail-block" v-model:visible="detailvisible" :title="detail.articleTitle" width="90%" wrap-class-name="full-modal"
          @ok="handleDelete" okText="删除" cancelText="取消">
          <div class="detailContent">
            <div>{{ detail.articleContent }}</div>
          </div>
        </a-modal>
        <!-- 写博客 -->
        <div class="write-block" v-if='current == "write"'>
          <span class="label">标题</span>
          <a-textarea v-model:value="write.articleTitle" placeholder="请输入博客标题..." auto-size />
          <div style="margin: 24px 0" />
          <span class="label">内容</span>
          <a-textarea v-model:value="write.articleContent" placeholder="请输入博客内容..."
            :auto-size="{ minRows: 3, maxRows: 14 }" />
          <div style="margin: 24px 0" />
          <a-button type="primary" block @click="postBlog">发布</a-button>
          <!-- 选择分类 -->
          <a-modal v-model:visible="visible" title="发布文章" @ok="handleOk" @Cancel="handleCancel">
            <div class="modalSubTitle" :style="{ marginRight: '8px' }">分类专栏：</div>
            <template v-for="tag in tags" :key="tag">
              <a-checkable-tag :checked="selectedTags.indexOf(tag.categoryId) > -1"
                @change="checked => handleChange(tag.categoryId, checked)">
                {{ tag.categoryName }}
              </a-checkable-tag>
            </template>
          </a-modal>
        </div>
        <!-- 回收站 -->
        <div class="bin-block" v-if='current == "bin"'>
          <div class="msg" v-if="deletedList.length == 0">回收站是空的~</div>
          <a-row class="articleRow" :data="deletedList">
            <a-col class="articleCol" :xs="{ span: 5, offset: 1 }" :lg="{ span: 7, offset: 1 }"
              v-for="value in deletedList">
              <a-card :title="value.articleTitle" style="width: 300px">
                <template #extra><a href="#" :id="value.articleId" @click="getDeletedBlogDetail($event)">
                    <arrow-right-outlined />
                  </a></template>
                <p class="articleContent">{{ value.articleContent }}</p>
                <a-card-meta>
                  <template #description>
                    <a-tag class="tag" v-for="value in tags" color="blue">{{ value.tagName }}</a-tag>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <!-- 已删除博客详情 -->
        <a-modal class="deleted-block" v-model:visible="deletedvisible" :title="deleted.articleTitle" width="90%" wrap-class-name="full-modal"
          @ok="handleRecover" okText="恢复" cancelText="取消">
          <div class="detailContent">
            <div>{{ deleted.articleContent }}</div>
          </div>
        </a-modal>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Jessie ©2021 Created by 陈家禧 20191002876
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
  import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue';
  import { message } from 'ant-design-vue';
  import { HomeOutlined, TagsOutlined, BookOutlined, UserOutlined, EditOutlined, DeleteOutlined, AuditOutlined, MenuUnfoldOutlined, MenuFoldOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';

  import axios from '../../utils/axios'

  export default defineComponent({
    name: 'AdminBlog',
    components: {
      HomeOutlined,
      TagsOutlined,
      BookOutlined,
      UserOutlined,
      EditOutlined,
      DeleteOutlined,
      AuditOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      ArrowRightOutlined
    },
    setup() {
      const selectedKeys = ref(['blog'])
      const current = ref(['posted'])
      const collapsed = ref(false)
      const detailvisible = ref(false);
      const deletedvisible = ref(false);
      const visible = ref(false)
      const articleList = reactive([])
      const deletedList = reactive([])
      const categoryList = reactive([])
      const detail = reactive({
        articleId: '',
        articleTitle: '',
        articleContent: ''
      })
      const deleted = reactive({
        articleId: '',
        articleTitle: '',
        articleContent: ''
      })
      const write = reactive({
        articleId: '',
        articleTitle: '',
        articleContent: ''
      })
      const state = reactive({
        tags: [],
        selectedTags: [],
      })

      /**
       * 获取已发布的博客列表
       */
      const getAllPostedBlogs = () => {
        articleList.length = 0
        axios.get('/manage-api/v1/getArticles').then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            // message.success('请求成功！')
            const Datas = res.data.data;
            for (let i = 0; i < Datas.length; i++) {
              articleList.push(Datas[i])
            }
          } else {
            message.error('获取已发布的博客列表失败！')
          }
        })
      }

      /**
       * 获取博客详情
       */
      const getBlogDetail = e => {
        console.log(e.currentTarget.id)
        detailvisible.value = true
        detail.articleId = e.currentTarget.id
        axios.get(`/manage-api/v1/getArticle/${detail.articleId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            const Datas = res.data.data;
            detail.articleTitle = Datas.articleTitle
            detail.articleContent = Datas.articleContent
          } else {
            message.error('获取博客详情失败！')
          }
        })
      }

      /**
       * 获取已删除博客详情
       */
      const getDeletedBlogDetail = e => {
        console.log(e.currentTarget.id)
        deletedvisible.value = true
        deleted.articleId = e.currentTarget.id
        axios.get(`/manage-api/v1/getArticle/${deleted.articleId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            const Datas = res.data.data;
            deleted.articleTitle = Datas.articleTitle
            deleted.articleContent = Datas.articleContent
          } else {
            message.error('获取博客详情失败！')
          }
        })
      }

      /**
       * 删除博客
       */
      const handleDelete = () => {
        axios.post(`/manage-api/v1/deleteArticle?articleId=${detail.articleId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            message.success('博客删除成功！')
            getAllPostedBlogs()
          } else {
            message.error('博客删除失败！')
          }
        })
        detailvisible.value = false;
      }

      /**
       * 恢复博客
       */
      const handleRecover = () => {
        axios.post(`/manage-api/v1/recoverArticle?articleId=${deleted.articleId}`).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            message.success('博客恢复成功！')
            getAllDeteledBlogs()
          } else {
            message.error('博客恢复失败！')
          }
        })
        deletedvisible.value = false;
      }

      /**
       * 发布博客
       */
      const postBlog = () => {
        if (write.articleTitle.length !== 0 && write.articleContent.length !== 0) {
          const params = {
            articleTitle: write.articleTitle,
            articleContent: write.articleContent
          }
          axios.post('/manage-api/v1/addArticle', params).then((res) => {
            console.log(res.data)
            const Datas = res.data
            if (Datas.resultCode === 200) {
              message.success('保存成功！')
              const articleId = Datas.data.articleId
              write.articleId = articleId
              getAllCategories()
              visible.value = true
              write.articleTitle.length = 0
              write.articleContent.length = 0
            } else {
              message.error('发布博客失败！')
            }
          })
        } else {
          message.warning('博客标题或内容不能为空！')
        }
      }

      /**
       * 获取分类列表
       */
      const getAllCategories = () => {
        state.tags.length = 0
        axios.get('/manage-api/v1/getCategories').then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            // message.success('请求成功！')
            const Datas = res.data.data;
            for (let i = 0; i < Datas.length; i++) {
              state.tags.push(Datas[i])
            }
          } else {
            message.error('获取分类列表失败！')
          }
        })
      }

      /**
       * 选择分类
       */
      const handleChange = (tag, checked) => {
        const {
          selectedTags,
        } = state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('Seleted Categories: ', nextSelectedTags);
        state.selectedTags = nextSelectedTags;
      };

      /**
       * 取消分类选择
       */
      const handleCancel = e => {
        console.log(e);
        visible.value = false;
        state.tags.length = 0
        state.selectedTags.length = 0
        message.warning('已取消选择分类！')
        message.success('博客发布成功！')
      };

      /**
       * 确认分类选择
       */
      const handleOk = e => {
        console.log(e);
        const articleId = write.articleId
        const params = {
          articleId: articleId,
          categoryIds: state.selectedTags
        }
        axios.post('/manage-api/v1/addNewContact', params).then((res) => {
          console.log(res.data)
          if (res.data.resultCode === 200) {
            message.success('博客发布成功！')
          } else {
            message.error('博客发布失败！')
          }
        })
        visible.value = false;
      };

      /**
       * 获取已删除的博客列表
       */
      const getAllDeteledBlogs = () => {
        deletedList.length = 0
        axios.get('/manage-api/v1/getDeletedArticles').then((res) => {

          console.log(res.data)
          if (res.data.resultCode === 200) {
            // message.success('请求成功！')
            const Datas = res.data.data;
            for (let i = 0; i < Datas.length; i++) {
              deletedList.push(Datas[i])
            }
          } else {
            message.error('获取已删除的博客列表失败！')
          }
        })
      }

      onMounted(() => {
        getAllPostedBlogs()
      })

      return {
        selectedKeys,
        current,
        collapsed,
        visible,
        detailvisible,
        deletedvisible,
        articleList,
        deletedList,
        categoryList,
        detail,
        write,
        deleted,
        ...toRefs(state),
        getAllPostedBlogs,
        getBlogDetail,
        handleDelete,
        handleRecover,
        postBlog,
        handleChange,
        handleOk,
        handleCancel,
        getAllDeteledBlogs,
        getDeletedBlogDetail
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

  .articleRow {
    margin-left: -3rem;
    margin-top: -1.5rem;
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

  .full-modal .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .detailContent {
    white-space: pre-wrap;
  }

  .detail-block {
    height: 100vh;
  }

  .full-modal .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  
  .full-modal .ant-modal-body {
    flex: 1;
  }

  .modalSubTitle {
    margin-bottom: 10px;
  }

  .msg {
    text-align: center;
    color: gray;
  }
</style>