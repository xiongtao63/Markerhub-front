<script>
import SlideMenu from "@/views/inc/SlideMenu.vue";
import Tabs from "@/views/inc/Tabs.vue";

export default {
  name: "Home",
  components: {Tabs, SlideMenu},
  data() {
    return {
      userinfo: {
        id:"",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(res => {
        this.userinfo = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    logout() {
      this.$axios.post("/logout").then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")

        this.$router.push("/login")
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<template>

  <el-container>
    <el-header>
      <strong>vueAdmin后台管理系统</strong>

      <div class="header-avatar block">
        <el-avatar size="small" :src="userinfo.avatar"></el-avatar>
        <el-dropdown>
          <span class="el-dropdown-link">
          {{userinfo.username}}

          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/userCenter">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-link href="https://space.bilibili.com/13491144">视频讲解</el-link>
        <el-link href="http://markerhub.com">网站</el-link>
      </div>


    </el-header>
    <el-container>
      <el-aside width="200px">
        <SlideMenu></SlideMenu>
      </el-aside>
      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px;">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;

  //line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 30px;
}
a{
  text-decoration: none;
}
</style>