<style scoped>
h3 {
  display: inline;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 1200px;
}

.layout-logo {
  font-family: "楷体";
  display: inline-block;
  /* width: 200px; */
  height: 30px;
  color: #f5f7f9;
  font-size: 30px;
  text-align: center;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.logo {
  width: 30px;
  height: 30px;
}

.layout-sider {
  height: 1200px;
}

.layout-nav {
  width: 420px;
  display: flex;
  justify-content: flex-end;
}

.menu {
  height: 50px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.systemName {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal"  theme="dark" active-name="1">
          <div class="header">
            <div class="systemName">
              <img class="logo" src="../assets/logo.png" />
              <div class="layout-logo">后台管理</div>
            </div>
            <div class="layout-nav">
              <MenuItem name="1">
              <Icon type="md-person" />
              当前用户:管理员
              </MenuItem>
              <MenuItem name="2">
              <Icon type="md-power" />
              注销
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout class="layout-sider">
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu theme="light" width="auto"  :open-names="['1']" active-name="1-1">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                <h3>培训管理</h3>
              </template>
              <MenuItem name="1-1" to="teacher">
              <Icon type="ios-people" />
              讲师管理
              </MenuItem>
              <MenuItem name="1-2" to="plan">
              <Icon type="ios-alarm" />
              培训计划
              </MenuItem>
              <MenuItem name="1-3" to="course">
              <Icon type="ios-book" />
              课程管理
              </MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{ padding: '0 24px 24px' }">
          <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {

};
</script>
