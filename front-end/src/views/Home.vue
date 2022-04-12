<template>
<div class="home">
  <section class="recipe-list">
    <div class="recipe-box" v-for="recipe in recipes" :key="recipe.id">
      <h2 style="text-align: center; font-size: 1.5em;">{{recipe.recipeName}}</h2>
      <img :src="recipe.path" />
      <p class="info">Ingredients:<br>{{recipe.ingredients}}</p>
      <p class="info">Instructions:<br>{{recipe.instructions}}</p>
      <p class="info">Notes:<br>{{recipe.notes}}</p>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
    data() {
    return {
     recipes: [],
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.recipe-box h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.recipe-list {
  column-gap: 3em;
  column-count: 1;
}

.recipe-box {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  border: 5px solid pink;
  padding: 10px;
}

.recipe-box img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

.info {
  color: grey;
}

</style>
