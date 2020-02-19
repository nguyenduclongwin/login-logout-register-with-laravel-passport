<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-push-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <strong>Đăng nhập</strong>
          </div>
          <div class="panel-body">
            <form v-on:submit.prevent="handleLoginFormSubmit()">
              <div class="form-group">
                <label>Địa chỉ Email</label>
                <input
                  class="form-control"
                  placeholder="Enter your email address"
                  type="text"
                  v-model="login.email"
                />
              </div>
              <div class="form-group">
                <label>Mật khẩu</label>
                <input
                  class="form-control"
                  placeholder="Enter your email address"
                  type="password"
                  v-model="login.password"
                />
              </div>
              <p v-if="error" class="alert alert-danger">Sai tên đăng nhập hoặc mật khẩu</p>
              <button class="btn btn-primary">Đăng nhập</button>
              <router-link to="/register"><button class="btn btn-primary">Đăng kí</button></router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        email: "nguyenduclongwin@gmail.com",
        password: "nguyenlong"
      },
      error: false
    };
  },
  methods: {
    handleLoginFormSubmit() {
      const authUser = {};
      axios({
        method: "post",
        url: "oauth/token",
        data: {
          grant_type: "password",
          client_id: 4,
          client_secret: "g4TBqI6zVcRRI7fCKbyd7JnpqKNFEo5SKJxG7lsF",
          username: this.login.email,
          password: this.login.password,
          scope: "*"
        }
      }).then(response => {
        if (response.status === 200) {
          console.log("Oauth token", response);
          authUser.access_token = response.data.access_token;
          authUser.refresh_token = response.data.refresh_token;
          window.localStorage.setItem("authUser", JSON.stringify(authUser));
          axios({
            method: "get",
            url: "api/user",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + JSON.parse(window.localStorage.getItem('authUser')).access_token
            }
          }).then(response => {
            console.log("User token", response);
            authUser.email = response.data.email;
            authUser.name = response.data.name;
            window.localStorage.setItem("authUser", JSON.stringify(authUser));
            this.$router.push({ name: "Home" });
          });
        }
      }).catch(error=>{
        this.error=true
      });
    }
  }
};
</script>