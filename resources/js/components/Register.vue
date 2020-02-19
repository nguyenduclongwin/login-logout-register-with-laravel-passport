<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-push-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <strong>Đăng kí</strong>
          </div>
          <div class="panel-body">
            <form v-on:submit.prevent="handleRegisterFormSubmit()">
              <div class="form-group">
                <label>Họ và tên</label>
                <input
                  class="form-control"
                  placeholder="Enter your name"
                  type="text"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label>Địa chỉ Email</label>
                <input
                  class="form-control"
                  placeholder="Enter your email address"
                  type="text"
                  v-model="email"
                />
              </div>

              <div class="form-group">
                <label>Mật khẩu</label>
                <input
                  class="form-control"
                  placeholder="Enter your password"
                  type="password"
                  v-model="password"
                />
              </div>
              <div class="form-group">
                <label>Nhập lại Mật khẩu</label>
                <input
                  class="form-control"
                  placeholder="Enter your repassword"
                  type="password"
                  v-model="repassword"
                />
              </div>
              <p v-if="status_register" class="alert alert-danger">Đăng kí không thành công</p>
              <button class="btn btn-primary">Đăng kí</button>
              <router-link to="/login">
                <button class="btn btn-primary">Đăng nhập</button>
              </router-link>
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
      name: "Long",
      email: "long6868@gmail.com",
      password: "long6868",
      repassword: "long6868",
      status_register: false
    };
  },
  methods: {
    handleRegisterFormSubmit() {
      axios
        .post("api/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          repassword: this.repassword
        })
        .then(response => {
          console.log(response);
          const authUser = {};
          axios({
            method: "post",
            url: "oauth/token",
            data: {
              grant_type: "password",
              client_id: 4,
              client_secret: "g4TBqI6zVcRRI7fCKbyd7JnpqKNFEo5SKJxG7lsF",
              username: this.email,
              password: this.password,
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
                  Authorization:
                    "Bearer " +
                    JSON.parse(window.localStorage.getItem("authUser"))
                      .access_token
                }
              }).then(response => {
                console.log("User token", response);
                authUser.email = response.data.email;
                authUser.name = response.data.name;
                window.localStorage.setItem(
                  "authUser",
                  JSON.stringify(authUser)
                );
                this.$router.push({ name: "Home" });
              });
            }
          });
        })
        .catch(errors => {
          this.status_register = true;
        });
    }
  }
};
</script>