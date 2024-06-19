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
            component:
              () =>
                import(
                  '../components/ColorInput.vue'
                ),
            props:
              (
                route
              ) => ({
                colorSettings:
                  {
                    primary:
                      route
                        .query
                        .primary ||
                      '#60A5FA',
                    secondary:
                      route
                        .query
                        .secondary ||
                      '#DBEAFE',
                    accent:
                      route
                        .query
                        .accent ||
                      '#94A3B8',
                    background:
                      route
                        .query
                        .background ||
                      '#FFFFFF',
                    text:
                      route
                        .query
                        .text ||
                      '#1E293B'
                  }
              })
          }
        ]
    }
  )

export default router
