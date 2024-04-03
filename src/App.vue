<!-- App.vue -->
<script setup>
import recipeAPI from './recipeAPI.js';

const {
    files,
    fileContent,
    currentPath,
    navigate
} = recipeAPI;

defineExpose({
    files,
    fileContent,
    currentPath,
    navigate
});
</script>

<template>
    <div class="container">
        <h1>FoodBuddy</h1>
        <h2>App for recipes advisory and management</h2>
        <button @click="() => navigate('index')">List Files</button>
        <ul v-if="!fileContent" class="no-bullets">
            <li v-for="file in files" :key="file.name">
                <button @click="() => navigate(file.path)">{{ file.name }}</button>
            </li>
        </ul>
        <button v-if="fileContent" @click="() => navigate(currentPath.value)">Go Back</button>
        <div v-if="fileContent" class="file-content">
            <h3>{{ fileContent.title }}</h3>
            <img :src="fileContent.image" alt="Recipe image" />
            <p><strong>Source:</strong> <a :href="fileContent.url">{{ fileContent.source }}</a></p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                <li v-for="ingredient in fileContent.ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>
            <p><strong>Directions:</strong></p>
            <ol>
                <li v-for="direction in fileContent.directions" :key="direction">{{ direction }}</li>
            </ol>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
}

.no-bullets {
    list-style-type: none;
    padding: 0;
}

.file-content {
    background-color: #f9f9f9;
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
}

.file-content img {
    width: 100%;
    height: auto;
}

@media (max-width: 600px) {
    .container {
        padding: 10px;
    }

    .file-content {
        padding: 10px;
    }
}
</style>