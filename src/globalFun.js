
export const globalMethods = {
    methods: {
        hasAuth(perm) {
            let authority = this.$store.state.menus.permList

            return authority.indexOf(perm) > -1
        },
        hello(){
            return true
        }
    }
};
