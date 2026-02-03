import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const isDarkMode = ref(localStorage.getItem('epanen_dark_mode') === 'true');

    const updateDocumentTheme = () => {
        if (isDarkMode.value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        localStorage.setItem('epanen_dark_mode', isDarkMode.value);
        updateDocumentTheme();
    };

    const initTheme = () => {
        updateDocumentTheme();
    };

    return {
        isDarkMode,
        toggleDarkMode,
        initTheme
    };
});
