import { App } from 'vue'
import fileRoutes from '~pages'
import { setupLayouts } from 'virtual:meta-layouts'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
	routes: setupLayouts(fileRoutes),
	history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
	const userStore = useUserStore()
	if (!userStore.user.isLoggedIn && to.path !== '/login') {
		next('/login')
	} else {
		next()
	}
})

export default (app: App) => app.use(router)
