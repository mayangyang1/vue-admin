<template>
    <el-row :span="24" class="tab-list flex-fs">
        <router-link v-for="item in tagsViewList" :key="item.name" :to="{ 'path': item.path, 'query': item.query, 'fullPath': item.fullPaht}">
            <div class="tag-view" :class="isTagActive(item)? 'main-bg-color' : ''">
                <span>{{item.meta.title? item.meta.title : item.name}}</span>
                <i class="el-icon-close" v-if="item.path !== '/'" @click.prevent="closeTag(item)"></i>
            </div>
        </router-link>
    </el-row>
</template>

<script>
export default {
    computed: {
        tagsViewList() {
            return this.$store.state.tagsView.tagsView;
        }
    },
    watch: {
        $route() {
            this.addTag();
        }
    },
    methods: {
        addTag() {
            this.$store.commit('ADD_TAGS_VIEW', this.$route);
            console.log(this.$route);
        },
        closeTag(tag) {
            if(tag.path === '/') {
                return;
            }
            this.$store.dispatch('closeTagsView', tag).then(tags => {
                if(this.isTagActive(tag)){
                    this.toLastTag(tags)
                }
            })
        },
        isTagActive(tag) {
            return tag.path === this.$route.path;
        },
        toLastTag( tags) {
            const lastTag = tags.slice(-1)[0]
            if(lastTag && lastTag.path != '/') {
                this.$router.push(lastTag);
            }else{
                this.$router.push('/')
            }
        }
    },
    mounted() {
        this.addTag();
    }
}
</script>

<style scoped>
    .tab-list{
        background-color: rgba(0, 0, 0, .05);
        height: 40px;
        border-bottom: 1px solid #f2f2f2;
    }
    .tag-view{
      border: 1px solid #f2f2f2;
      border-radius: 3px;
      margin-left: 10px;
      padding: 5px 10px;
      font-size: 14px;
      cursor: pointer;
    }
    .el-icon-close{
        padding-left: 4px;
    }
</style>