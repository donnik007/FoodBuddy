// recipeAPI.js
import { ref } from 'vue';

let files = ref([]);
let fileContent = ref(null);
let currentPath = ref('index');

async function navigate(path = 'index') {
    const response = await fetch(`https://api.github.com/repos/dpapathanasiou/recipes/contents/${path}`);
    const jsonData = await response.json();

    if (Array.isArray(jsonData)) {
        files.value = jsonData.filter(file => file.name !== 'README.md');
        fileContent.value = null;
        currentPath.value = path;
    } else {
        fileContent.value = JSON.parse(atob(jsonData.content));
        files.value = [];
    }
}

export default {
    files,
    fileContent,
    currentPath,
    navigate
};