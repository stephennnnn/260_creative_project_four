<template>
<div class="admin">

  <h1>Add Recipes Here!</h1>

  <div class="heading">
    <h2>Add a Recipe</h2>
  </div>

  <div class="add">
    <div class="form">
      <div class="holder">
        <input v-model="recipeName" placeholder="Recipe Name">
        <input type="file" name="photo" @change="fileChanged">
        <textarea v-model="ingredients" placeholder="Ingredients"></textarea>
        <textarea v-model="instructions" placeholder="Instructions"></textarea>
        <textarea v-model="notes" placeholder="Notes"></textarea>
      </div>
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addRecipe">
      <img :src="addRecipe.path" />
      <h2>{{addRecipe.recipeName}}</h2>
    </div>
  </div>

  <div class="heading">
    <h2>Change or Delete a Recipe</h2>
  </div>

  <div class="edit">
    <div class="form">
      <input v-model="findRecipeName" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectRecipe(s)">{{s.recipeName}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findRecipe">
      <div class="holder">
        <input v-model="findRecipe.recipeName">
        <img :src="findRecipe.path" />
        <textarea v-model="findRecipe.ingredients"></textarea>
        <textarea v-model="findRecipe.instructions"></textarea>
        <textarea v-model="findRecipe.notes"></textarea>
      </div>
    </div>
    <div class="actions" v-if="findRecipe">
      <button @click="deleteRecipe(findRecipe)">Delete</button>
      <button @click="editRecipe(findRecipe)">Edit</button>
    </div>
  </div>

</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Add',
    data() {
    return {
      recipeName: "",
      ingredients: "",
      instructions: "",
      notes: "",
      file: null,
      addRecipe: null,
      recipes: [],
      findRecipeName: "",
      findRecipe: null,
    }
  },
  computed: {
    suggestions() {
      let recipes = this.recipes.filter(recipe => recipe.recipeName.toLowerCase().startsWith(this.findRecipeName.toLowerCase()));
      return recipes.sort((a, b) => a.recipeName > b.recipeName);
    }
  },
  created() {
    this.getRecipes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          recipeName: this.recipeName,
          ingredients: this.ingredients,
          instructions: this.instructions,
          notes: this.notes,
          path: r1.data.path
        });
        this.addRecipe = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRecipe(recipe) {
      this.findRecipeName = "";
      this.findRecipe = recipe;
    },
    async deleteRecipe(recipe) {
      try {
        await axios.delete("/api/recipes/" + recipe._id);
        this.findRecipe = null;
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editRecipe(recipe) {
      try {
        await axios.put("/api/recipes/" + recipe._id, {
          recipeName: this.findRecipe.recipeName,
          ingredients: this.findRecipe.ingredients,
          instructions: this.findRecipe.instructions,
          notes: this.findRecipe.notes,

        });
        this.findRecipe = null;
        this.getrecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: grey;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  color: pink;
  text-align: center;
}

.add,
.edit {
  display: flex;
}

.holder {
 display: flex;
 flex-direction: column;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
