import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// ленивая загрузка
const auth = resolve => {
  require.ensure(['@/auth/auth'], () => {
    resolve(
      require('@/auth/auth')
    )
  })
}
const index = resolve => {
  require.ensure(['@/components/index'], () => {
    resolve(
      require('@/components/index')
    )
  })
}
const groups = resolve => {
  require.ensure(['@/components/groups'], () => {
    resolve(
      require('@/components/groups')
    )
  })
}
const register = resolve => {
  require.ensure(['@/components/indexRegister'], () => {
    resolve(
      require('@/components/indexRegister')
    )
  })
}
const indexMonitor = resolve => {
  require.ensure(['@/components/indexMonitor'], () => {
    resolve(
      require('@/components/indexMonitor')
    )
  })
}
const userAdd = resolve => {
  require.ensure(['@/components/userAdd/userAdd'], () => {
    resolve(
      require('@/components/userAdd/userAdd')
    )
  })
}
const page404 = resolve => {
  require.ensure(['@/components/page404'], () => {
    resolve(
      require('@/components/page404')
    )
  })
}
const calendar = resolve => {
  require.ensure(['@/components/calendar'], () => {
    resolve(
      require('@/components/calendar')
    )
  })
}
const c2 = resolve => {
  require.ensure(['@/components/calendar/c2'], () => {
    resolve(
      require('@/components/calendar/c2')
    )
  })
}
const reports = resolve => {
  require.ensure(['@/components/reports'], () => {
    resolve(
      require('@/components/reports')
    )
  })
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'auth',
      component: auth
    },
    {
      path: '/ig',
      name: 'groups',
      component: groups,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ir',
      name: 'register',
      component: register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/im',
      name: 'indexMonitor',
      component: indexMonitor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userAdd',
      name: 'userAdd',
      component: userAdd,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reports',
      name: 'reports',
      component: reports,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: calendar,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/calendar/:id',
      name: 'calendarid',
      component: c2,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'page404',
      component: page404,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// авторизация
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin === 1) {
          next()
        } else {
          next({ name: 'auth' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'auth' })
    }
  } else {
    next()
  }
})

export default router
