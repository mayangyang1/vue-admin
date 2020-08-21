    
<template>
    <div class="sideItem">
        <div class="menu-name">{{menuName}}</div>
        <template v-for="(list, listIndex) in json">
            <!-- 有子路由的 -->
            <div class="side-bar" v-if="list.children && list.children.length > 0" :index="list.name + listIndex" :key="listIndex">
                <div class="side-name">
                    <side-value :title="routeName(list)"></side-value>
                </div>
                <template v-for="(item, itemIndex) in list.children">
                    <!-- 子路由里没有子路由的 -->
                    <side-link :to="item" :key="itemIndex">
                        <div class="side-value">
                            <side-value  :title="routeName(item)"></side-value>
                        </div>
                    </side-link>
                </template>
            </div>
        </template>
    </div>
</template>
<script>
import SideLink from './SideLink'
import SideValue from './SideValue'
export default {
    name: 'sideItem',
    components: { 
        'side-link': SideLink,
        'side-value': SideValue
    },
    props: {
        json: Array
    },
    computed: {
        menuName() {
            let topMenuList = this.$store.state.topMenuList;
            if(topMenuList.length>0) {
                return this.$store.state.topMenuList[this.$store.state.menuIndex].resourceName;
            }else{
                return ''
            }
            
        }
    },
    methods: {
        routeIcon(route) {
            if (route.meta && route.meta.icon) {
                return route.meta.icon
            } else {
                return ''
            }
        },
        routeName(route) {
            if (route.meta && route.meta.title) {
                return route.meta.title
            } else {
                return route.resourceName
            }
        }
    }
}
</script>
<style scoped>
.menu-name{
    font-size: 18px;
    color: #f48400;
    padding: 11px 15px;
    border-bottom: solid 1px #d9d9d9;
    font-weight: 700;
}
.side-bar:hover{
    background-color: rgba(0,0,0,.03);
}
.side-name{
    display: block;
    padding: 10px 15px;
    margin-bottom: 3px;
    font-weight: 700;
    border-bottom: solid 1px #e3e3e3;
    font-size: 14px;
}
.sideItem{
    background-color: rgba(0,0,0,.02);
    overflow: auto;
}
.side-value{
    line-height: 24px;
    font-size: 12px;
    padding-left: 30px;
    border-bottom: none;
    color: #454545;
}
.side-value::before{
    content: "";
    display: inline-block;
    vertical-align: middle;
    width: 2px;
    height: 8px;
    margin-right: 10px;
    background-color: #ddd;
}
.side-value::before:hover{
    color: #f4b200;
}
.side-value:hover{
    color: #f4b200;
}
.sideItem a {
    
    display: block;

}
</style>