<script>
export default {
    name: 'sideValue',
    functional: true,
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        const {title } = context.props
        const vnodes = []
        if (title) vnodes.push(<span class='el-title' slot='title'>{(title)}</span>)
        return vnodes
    }
}
</script>
<style  scoped>
 /* .el-title:hover{
    color: #f4b200;
 } */

</style>