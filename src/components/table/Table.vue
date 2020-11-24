<template>
<div class="fix-table-wrap">
    <table>
      <thead>
        <tr>
          <th class="fix-hd fix-col" v-show="needCheckBox">
            <input type="checkbox" class="ck-all">
          </th>
          <th class="fix-hd fix-col" v-if="operatable">操作</th>
          <th v-for="col in columns" :class="col.fixCol? 'fix-col' : ''"  class="fix-hd" :key="col.key||col.slot">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td class="fix-col check-box" v-show="needCheckBox">
            <input type="checkbox" class="ck-single">
          </td>
          <td class="fix-col" v-if="operatable">
            <div class="cell" style="width: 100px">
              <el-button size="mini" v-if="operationList[rowIndex] && operationList[rowIndex].length === 1" @click="operationAction(operationList[rowIndex][0]['actionUrl'], row)">{{ operationList[rowIndex][0]['name'] }}</el-button>
              <el-dropdown v-else-if="operationList[rowIndex] && operationList[rowIndex].length > 1" size="mini" split-button  @click="operationAction(operationList[rowIndex][0].actionUrl, row)">
                {{ operationList[rowIndex][0].name }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in operationList[rowIndex]" :key="index" >
                    <span v-if="index > 0" @click="operationAction(item.actionUrl, row)">{{ item.name }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </td>
          <td v-for="col in columns" :class="col.fixCol? 'fix-col' : ''" :key="col.key||col.slot">
            <template v-if="'render' in col">
              <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
            </template>
            <template v-else-if="'slot' in col">
              <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot>
            </template>
            <template v-else>{{ row[col.key] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Render  from './render.js'
import { addClass, removeClass, hasClass } from '../../config/util.js';
  export default {
    components: {
      Render 
    },
    props: {
      columns: {
        type: Array,
        default () {
          return [];
        }
      },
      data: {
        type: Array,
        default () {
          return [];
        }
      },
      operatable: {
        type: Boolean,
        'default': true
      },
      needCheckBox: {
        type:Boolean,
        'default': true
      },
      operationList:{
        type: Array,
        default(){
          return [];
        } 
      }
    },
    methods: {
      checkRow() {
        const ckAll = document.querySelector('.ck-all'),
          ckSingle = document.querySelectorAll('.ck-single'),
          ckLength = ckSingle.length;
        // console.log(ckAll, ckSingle, ckLength);
        let countNum = 0;
        ckSingle.forEach((item) => {
          if (item.checked === true) {
            countNum += 1;
            addClass(item.parentNode.parentNode, 'active');
          } else {
            removeClass(item.parentNode.parentNode, 'active');
          }
        });
        if (countNum === ckLength) {
          ckAll.checked = true;
        } else {
          ckAll.checked = false;
        }
      },
      checkAll() {
        const ckAll = document.querySelector('.ck-all'),
          ischeckAll = ckAll.checked,
          ckTr = document.querySelectorAll('tbody tr'),
          ckSingle = document.querySelectorAll('.ck-single');
        // console.log(ckAll, ischeckAll, ckTr, ckSingle);
        ckSingle.forEach((item) => {
          item.checked = ischeckAll;
        });
        if (ischeckAll === true) {
          ckTr.forEach((tr) => {
            addClass(tr, 'active');
          });
        } else {
          ckTr.forEach((tr) => {
            removeClass(tr, 'active');
          });
        }
      },
      operationAction(action, item) {
        console.log('operationAction', action)
        const self = this;
        self.$emit('operationAction',{action:action,params:item})
      },
      fixedTable(event) {
      // console.log('target is', event.target);
        const tableWrap = event.target,
        top = tableWrap.scrollTop,
        left = tableWrap.scrollLeft,
        fixHd = tableWrap.querySelectorAll('.fix-hd'),
        fixCol = tableWrap.querySelectorAll('.fix-col'),
        unit = 'px';
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = top + unit;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = left + unit;
        }
      },
      clearFiexdTable() {
        const fixHd = document.querySelectorAll('.fix-hd'),
        fixCol = document.querySelectorAll('.fix-col'),
        unit = 'px';
        for (let i = 0, len = fixHd.length; i < len; i++) {
          fixHd[i].style.top = 0 + unit;
        }
        for (let j = 0, len = fixCol.length; j < len; j++) {
          fixCol[j].style.left = 0 + unit;
        }
      }
    },
    
    mounted(){
      // 单选
      document.querySelector('.fix-table-wrap').addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target.nodeName);
        if (hasClass(target, 'ck-single')) {
          this.checkRow();
        }
        if (target.nodeName === 'TD') {
          target.parentNode.childNodes[0].querySelector('.ck-single').click();
        }
        if (target.nodeName === 'SPAN' && target.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName === 'TD') {
          target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].querySelector('.ck-single').click();
        }
      });
      // 全选
      document.querySelector('.ck-all').addEventListener('click', this.checkAll);

      // 重置宽度
      document.querySelectorAll('.fix-table-wrap').forEach((value) => {
        value.addEventListener('scroll', this.fixedTable);
      });

    },
    deactivated() {
      this.clearFiexdTable();
    }

  }
</script>
<style>
 .fix-table-wrap .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #ecf5ff;
    color: #f48400 !important;
}
  .fix-table-wrap{
    flex: 1;
    width:100%;
    overflow-x: auto;
    position: relative;
    min-height: 500px;
    max-height: 600px;
    overflow-y: auto;
    margin-top: -1px;
  }
 .fix-table-wrap table tbody tr.active .fix-col {
    background-color: #bcffb6;
}
.fix-table-wrap table tbody tr.active:hover .fix-col {
    background-color: #bcffb6;
}
  .fix-table-wrap .fix-hd.fix-col {
    position: relative;
    z-index: 30;
    top: 0;
  }
  .fix-table-wrap .fix-hd{
    position: relative;
    z-index: 10;
    top: 0;
  }
  .fix-table-wrap .fix-col {
    position: relative;
    z-index: 10;
    left: 0;
  }
  .fix-table-wrap tbody .fix-col {
    background-color: #fff;
  }
  
  .fix-table-wrap table tbody tr:hover .fix-col{
    background: #fff2b5;
  }
  table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
    font-size: 14px;
    
  }
  table .el-dropdown {
    position: relative;
    color: #48576a;
    font-size: 14px;
  }
  .fix-table-wrap table th{
    background: #e6e6e6;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
    text-align: center;
    padding: 6px 8px;

  }
  .fix-table-wrap table  tr:nth-child(even) .fix-col {
    background-color: #f6f6f6;
  }
  table thead th{
    background-color: #e6e6e6;
  }

  table td, table th{
    padding: 4px 8px;
    border: solid 1px #ddd;
    text-align: center;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
  }
  table tr:nth-child(even){
    background-color: #f6f6f6;
  }
  table tr:nth-child(odd){
    background-color: #fff;
  }

  table tr:hover{
    background: #fff2b5;
  }
  table .active{
    background-color: #bcffb6!important;
  }
  .check-box{
    width: 20px;;
  }
</style>