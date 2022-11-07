import { App, createApp } from 'vue';
import ActualApp from './App.vue';
import { VUE_PLUGIN_IMPORTS } from './plugins/vue-plugin-imports';
import { createI18n } from 'vue-i18n';
import ru from './locales/ru.json';
import en from './locales/en.json';

const MOUNT_DIV_ID = '#app';
let app: App<Element>;

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
        "ru": ru,
        "en": en
    },
})

export class ComponentRegistration {
    static init() {
        app = createApp(ActualApp);
        for (let i = 0; i < VUE_PLUGIN_IMPORTS.length; i++) {
            app.use(VUE_PLUGIN_IMPORTS[i]);
        }
        app.use(i18n);
        app.mount(MOUNT_DIV_ID);
    }
}

ComponentRegistration.init();
