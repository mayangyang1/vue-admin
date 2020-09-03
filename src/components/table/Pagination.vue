<template>
  <!-- pagination -->
  <div class="pagination">
    <button class="page-preview" :disabled="page === 1" @click="pagerClick(page - 1)">&laquo; 上一页</button>
    <ul class="page-list">
      <li v-if="pagers.indexOf(1) < 0" @click="pagerClick(1)">1</li>
      <li v-if="pagers.indexOf(2) < 0 && page > 1">...</li>
      <li v-for="pager in pagers" :key="pager" :class="{ active: pager === page }" @click="pagerClick(pager)">{{ pager }}</li>
      <li v-if="pagers.indexOf(totalPage - 1) < 0 && totalPage > 1">...</li>
      <li v-if="pagers.indexOf(totalPage) < 0 && totalPage != 0" @click="pagerClick(totalPage)">{{ totalPage }}</li>
    </ul>
    <button class="page-next" :disabled="page >= totalPage" @click="pagerClick(page + 1)">下一页 &raquo;</button>
    <span class="page-total">共{{ total }}条</span>
    <span class="page-size">
        <select class="page-select" @change="pageSizeChange" v-model="currentPageSize">
          <option value="10">10条/页</option>
          <option value="20" selected>20条/页</option>
          <option value="50">50条/页</option>
          <option value="100">100条/页</option>
          <option value="200">200条/页</option>
          <option value="500">500条/页</option>
          <option value="1000">1000条/页</option>
        </select>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'page',

    props: {
      page: Number,
      pageSize: Number,
      total: Number
    },
    data() {
      return {
        totalPage: Number,
        currentPageSize: this.pageSize
      };
    },
    methods: {
      pagerClick(newPage, newPageSize) {

        if (!newPageSize) {
          this.$emit('change', newPage, this.pageSize);
        } else {
          this.$emit('change', newPage, newPageSize);
        }
      },
      pageSizeChange(event) {
        const newPageSize = Number(event.target.value);
        this.$emit('change', this.page, newPageSize);
      },
      cal() {
        const n = this.total % this.pageSize;
        if (n > 0) {
          this.totalPage = Math.floor(this.total / this.pageSize) + 1;
        } else {
          this.totalPage = Math.floor(this.total / this.pageSize);
        }

        // 如果当前页码小于第一页，强制将其设置成第一页
        if (this.page < 1 || this.totalPage === 0) {
          this.page = 1;
        }

        // 如果当前页码大于总页码，强制设置成总页码
        if (this.totalPage > 0 && this.page > this.totalPage) {
          // this.page = this.totalPage;
          this.page = 1;
        }
      }
    },
    computed: {
      pagers() {
        this.cal();

        // 总共需要展示除了首页和尾页以外的页标签个数
        const step = 5;

        // 返回的页标签内容
        let pageArr = [];

        // 初始化当前循环到页标签
        let c = this.page;
        // 计算出前段需要放置的页标签个数
        let frontStep = Math.floor((step - 1) / 2);
        const rfrontStep = frontStep;

        // 循环放置前段分页标签
        while (c > 1 && frontStep > 0) {
          c -= 1;
          pageArr.push(c);
          frontStep -= 1;
        }

        // 放置当前页标签
        pageArr.push(this.page);

        // 计算后段需要放置的页标签
        let afterStep = ((step - 1) - rfrontStep) + frontStep;

        c = this.page;

        // 循环放置后段标签
        while (c < this.totalPage && afterStep > 0) {
          c += 1;
          pageArr.push(c);
          afterStep -= 1;
        }

        pageArr = pageArr.sort((a, b) => {
          return a - b;
        });
        return pageArr;
      }
    },
    created() {
      this.cal();
    }
  };
</script>

<style lang="scss" scoped rel="stylesheet/scss">
@import "../../assets/scss/rl-pagination.scss";
</style>
