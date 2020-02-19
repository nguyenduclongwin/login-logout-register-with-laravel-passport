<template>
  <div class="container">
    <h1 style="text-align:center">Home!</h1>
    <button v-on:click="logout" class="btn btn-primary">Đăng xuất</button>
  </div>
</template>
<script>
	export default{
		methods:{
			logout(){
				localStorage.removeItem("authUser");
				location.reload();
			}
		}
	}
</script>