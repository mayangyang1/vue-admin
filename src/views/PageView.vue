<template>
    <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive :include="keepRoutes">
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>
<script>
export default {
    data() {
        return {
 
        }
    },
    computed: {
        keepRoutes() {
            let routelist = this.$store.state.tagsView.tagsView
            console.log('tagsView',routelist)
            let keepRouteList = [];
            routelist.forEach(item => {
                keepRouteList.push(item.name);
            })
            return keepRouteList;
        }
    }
}
</script>
