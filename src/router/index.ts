import {
  createRouter,
  createWebHistory
} from 'vue-router'

// Import the ButtonsSection component
import AboutView from '../views/AboutView.vue'

const router =
  createRouter(
    {
      history:
        createWebHistory(
          import.meta
            .env
            .BASE_URL
        ),
      routes:
        [
          {
            path: '/aboutview',
            name: 'aboutview',
            component:
              AboutView
          },
          {
            path: '/',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component:
              () =>
                import(
                  '../components/ColorInput.vue'
                )
          }
        ]
    }
  )

export default router
