<script>
export default {
    name: 'sideLink',
    functional: true,
    props: {
        to: {
            required: true
        }
    },
    render(h, context) {
        const { to } = context.props
        const vnodes = []
        vnodes.push(<router-link to={{ 'name': to.pathRoute }}>{context.children}</router-link>)
        return vnodes
    }
}
</script>