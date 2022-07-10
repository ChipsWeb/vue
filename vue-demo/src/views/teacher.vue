<template>
  <div>
    <div class="t-header">
      <div class="input-select">
        <!-- <Input style="width:500px" search enter-button placeholder="请输入需要查询的关键字" /> -->
        <div class="departmentSelect">
          <div class="select-dep">部门:</div>
          <Select v-model="sea.departmentId" style="width: 200px">
            <Option
              v-for="item in departments"
              :key="item.id"
              :value="item.id"
              >{{ item.department }}</Option
            >
          </Select>
        </div>
        <div class="postSelect">
          <div class="select-post">岗位:</div>
          <Select
            v-model="sea.post"
            style="width: 200px; height: 32px"
            placeholder="请选择岗位"
          >
            <Option value="开发">开发</Option>
            <Option value="前端">前端</Option>
            <Option value="java">java</Option>
          </Select>
        </div>
        <div class="nameInput">
          <div class="input-name">姓名:</div>
          <Input
            v-model="sea.name"
            placeholder="请输入姓名"
            style="width: 198px"
          />
        </div>
        <Button
          type="primary"
          shape="circle"
          icon="ios-search"
          @click="searchUser"
          >搜索</Button
        >
        <Button
          class="reset"
          type="primary"
          shape="circle"
          icon="md-sync"
          @click="reset"
          >重置</Button
        >
        <Button
          class="delAll"
          type="primary"
          @click="delAll"
          shape="circle"
          icon="md-trash"
          >批量删除</Button
        >
      </div>
      <Button type="primary" shape="circle" @click="showModal(1)"
        >新增讲师</Button
      >
      <Modal v-model="modal1" :title="title" style="text-align: center">
        <Form
          :model="formItem"
          :label-width="80"
          :rules="ruleValidate"
          ref="formValidate"
        >
          <FormItem label="姓名:" prop="name">
            <Input
              v-model="formItem.name"
              placeholder="请输入姓名"
              style="text-align: left"
            />
          </FormItem>
          <FormItem label="部门:">
            <Select v-model="formItem.departmentId" style="text-align: left">
              <Option
                v-for="item in departments"
                :key="item.id"
                :value="item.id"
                >{{ item.department }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="岗位:">
            <Select v-model="formItem.post" style="text-align: left">
              <Option value="开发">开发</Option>
              <Option value="前端">前端</Option>
              <Option value="java">java</Option>
            </Select>
          </FormItem>
          <FormItem label="分数:" prop="score">
            <Input
              number
              v-model="formItem.score"
              placeholder="请输入分数"
              style="text-align: left"
            />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="cancel">取消</Button>
          <Button type="primary" size="large" @click="ok">确定</Button>
        </div>
      </Modal>
    </div>
    <Table border :columns="columns7" :data="data6">
      <template slot-scope="{ row }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(row)"
          >编辑</Button
        >
        <Button type="error" size="small" @click="remove(row.id)">删除</Button>
      </template>
    </Table>
    <div class="pagefooter">
      <Page
        :total="data6.length"
        style="text-align: center"
        page-size="pageSize"
        curreny="page"
        show-total
        @on-change="onPageChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const validateScore = (rule, value, callback) => {
      // 模拟异步验证效果
      if (Number.isInteger(value)) {
        if (value > 100 || value<0 ) {
          callback(new Error("请输入100以内的分数"));
        } else {
          callback();
        }
      }
    };
    return {
      page: 1, //默认为第一页
      pageSize: 6,
      sea: {
        name: "",
        departmentId: -1,
        post: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        score: [
          {
            validator: validateScore,
            trigger: 'blur'
          },
        ],
      },
      columns7: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "工号",
          width: 100,
          key: "id",
          align: "center",
        },
        {
          title: "姓名",
          width: 250,
          key: "name",
          align: "center",
        },
        {
          title: "部门",
          key: "departmentName",
          align: "center",
        },
        {
          title: "岗位",
          key: "post",
          align: "center",
        },
        {
          title: "分数",
          key: "score",
          align: "center",
        },
        {
          title: "操作",
          slot: "action",
          width: 300,
          align: "center",
        },
      ],
      data6: [],
      formItem: [],
      title: "新增讲师",
      value: "",
      modal1: false,
      formItem: {
        id: null,
        name: "",
        score: null,
        post: "",
        departmentId: null,
      },
      departments: [],
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
    };
  },
  created() {
    this.getUsers();
    this.getDepart();
  },
  methods: {
    getUsers() {
      this.$http
        .post("http://192.168.1.12:9000/api/teacher/query")
        .then((res) => {
          this.data6 = res.data;
        });
    },
    getDepart() {
      this.$http
        .get("http://192.168.1.12:9000/api/teacher/findAllDep")
        .then((res) => {
          // console.log("dep", res.data);
          this.departments = res.data;
        });
    },
    createUsers() {
      this.$http
        .post("http://192.168.1.12:9000/api/teacher/add", {
          name: this.formItem.name,
          post: this.formItem.post,
          departmentId: this.formItem.departmentId,
          score: this.formItem.score,
        })
        .then((res) => {
          //判断是否新增成功
          this.getUsers();
        });
    },
    updateUser() {
      this.$http
        .post("http://192.168.1.12:9000/api/teacher/updata", this.formItem)
        .then((res) => {
          this.getUsers();
        });
    },
    deleteUser(id) {
      this.$http
        .get("http://192.168.1.12:9000/api/teacher/delete?id=" + id)
        .then((res) => {
          this.getUsers();
        });
    },
    searchUser() {
      this.$http
        .get(
          "http://192.168.1.12:9000/api/teacher/find?name=" +
            this.sea.name +
            "&post=" +
            this.sea.post +
            "&departmentId=" +
            this.sea.departmentId
        )
        .then((res) => {
          this.data6 = res.data;
        });
    },
    showModal(code) {
      if (code == 1) {
        this.title = "新增讲师";
      } else {
        this.title = "修改讲师";
      }
      this.modal1 = true;
    },
    show(item) {
      this.formItem = JSON.parse(JSON.stringify(item));

      this.showModal(2);
    },
    remove(id) {
      // console.log("id:", id);
      this.deleteUser(id);
    },
    ok() {
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          if (this.formItem.id === null) {
            //新增
            this.createUsers();
            this.modal1 = false;
          } else {
            this.updateUser();
            this.modal1 = false;
          }
        }
        return;
      });
    },
    cancel() {
      this.modal1 = false;
    },
    //批量删除
    delAll() {
      const data = this.$refs.selection.getSelection();
      let newData = [];
      for (let delItem of data) {
        this.data6.splice(
          this.data6.findIndex((item) => item.id === delItem.id),
          1
        );
      }
    },
    reset() {
      this.sea.departmentId = -1;
      this.sea.name = "";
      this.sea.post = "";
      this.getUsers();
    },
  },
};
</script>
<style>
.delAll {
  display: inline-block;
  margin-left: 10px;
}

.reset {
  display: inline-block;
  margin-left: 10px;
}

.pagefooter {
  margin-top: 5px;
}

.input-select {
  margin: 25px 0;
}

.select-post {
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
}

.select-dep {
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
}

.nameInput {
  display: inline-block;
  margin: 0 30px 0 50px;
}

.input-name {
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
}

.t-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.departmentSelect {
  display: inline-block;
}

.postSelect {
  display: inline-block;
  margin-left: 50px;
}
</style>