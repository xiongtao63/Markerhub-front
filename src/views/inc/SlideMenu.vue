<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
export default {
  name: "SlideMenu",
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
  },
  data(){
    return {
      // menuList: this.$store.state.menus.menuList,
    }
  },
  computed:  {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      }
    }
  },
  methods:{
    selectMenu(item) {
      this.$store.commit("addTab", item)
    }
  }
}
</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :default-active="this.$store.state.menus.editableTabsValue"
      text-color="#fff"

  >
    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({name: 'Index', title: '首页'})">
        <el-icon><icon-menu /></el-icon>
        <span>首页</span>
      </el-menu-item>
    </router-link>

    <el-sub-menu :index="menu.name" v-for="menu in menuList">
      <template #title>{{menu.title}}</template>
      <router-link :to="item.path" v-for="item in menu.children">
        <el-menu-item :index="item.name" @click="selectMenu(item)">{{item.title}}</el-menu-item>
      </router-link>
    </el-sub-menu>

  </el-menu>
</template>

<style scoped>
.el-menu-vertical-demo{
  height: 100vh;
}
</style>