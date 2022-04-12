<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="recipe in recipes" :key="recipe.id">
      <h2>{{recipe.recipeName}}</h2>
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
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 3em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  border: 1px solid grey;
  padding: 10px;
}

.image img {
  width: 100%;
}

.info {
  color: grey;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
