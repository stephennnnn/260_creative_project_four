<template>
<div id="app">

  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img class="logo-image" src="/grandma.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Grandma's Cookbook</h1>
    </div>
  </div>

  <div class="content">
    <router-view />
  </div>

  <div class="footer">
    <router-link to="/add">Add Recipes</router-link>
    <br>
    <a class="github-link" href="https://github.com/stephennnnn/260_creative_project_four">Github</a>
  </div>

</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  padding: 10px 10px 0px 10px;
  background-color: grey;
  color: pink;
}

.logo-image {
  height: 100px;
  width: auto;
  margin-right: 30px;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  text-align: center;
  padding-top: 25px;
  background: grey;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.footer a {
  color: white;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
