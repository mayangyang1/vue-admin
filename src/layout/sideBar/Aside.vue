<template>
    <el-col :span="24">
        <el-menu
            :default-active="$route.name"
            class="el-menu-vertical-demo"
            text-color="#fff"
            active-text-color="#ffd04b">
            <side-item :json="filterRoutes"></side-item>
        </el-menu>
    </el-col>
</template>

<script>
import SideItem from './SideItem'
export default {
    data() {
        return {
            // filterRoutes: [],//过滤后的侧边栏路由
        }
    },
    components: {
        'side-item' : SideItem
    },
    computed: {
        filterRoutes() {
            return this.$store.state.filterMenuList;
        }
    },
    methods: {
        
    },
    created() {
        // this.filterRoutes = [//根据需要这里过滤到自己所需要的路由列表 这里直接写死
        //     {
        //         path: '',
        //         name: 'testPage',
        //         component: () => import( /* webpackChunkName: "about" */ '@/views/Index.vue'),
        //         meta: {
        //             keep: true,
        //             title: '首页',
        //             name: 'testPage',
        //             icon: 'el-icon-s-home'
        //         },
        //         children:[
        //             {
        //                 path: '/resource',
        //                 name: 'resource',
        //                 component: () => import( /* webpackChunkName: "about" */ '@/views/Resource.vue'),
        //                 meta: {
        //                     keep: true,
        //                     title: '货源2',
        //                     name: 'resource',
        //                     icon: 'el-icon-setting'
        //                 }
        //             },
        //             {
        //                 path: '/resource',
        //                 name: 'resource',
        //                 component: () => import( /* webpackChunkName: "about" */ '@/views/Resource.vue'),
        //                 meta: {
        //                     keep: true,
        //                     title: '货源3',
        //                     name: 'resource',
        //                     icon: 'el-icon-setting'
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         path: '/resource',
        //         name: 'resource',
        //         component: () => import( /* webpackChunkName: "about" */ '@/views/Resource.vue'),
        //         meta: {
        //             keep: true,
        //             title: '货源',
        //             name: 'resource',
        //             icon: 'el-icon-setting'
        //         }
        //     },
        //     {
        //         path: '/404Page',
        //         name:'UnFindPage',
        //         component: () => import('../../views/UnFindPage.vue'),
        //         meta: {
        //             keep: true,
        //             title: '404',
        //             name: 'UnFindPage',
        //             icon: 'el-icon-help'
        //         }
        //     }
        // ]
    }
}
</script>

<style scoped>
  .el-menu {
   border: none!important;
   text-align: left;
 } 
</style>