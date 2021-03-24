<template>
 <div><vueWangeditor id="editor" v-model="content"  style="width:100%"/></div>
</template>

<script>
import vueWangeditor from 'vue-wangeditor'
export default {
 data(){
 return{
     content:`
                <div>
                    <h1>0000</h1>
                </div>
            `
 }
 },
 created(){},
 methods:{},
 components:{
     vueWangeditor
 }
}

</script>
<style scoped>
#editor{
    width: 100%;
    height: 500px;
}
</style>