import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/agency/profile',
    name: 'AgencyProfile',
    component: () => import('../agency/pages/AgencyProfile'),
  },
  {
    path: '/customer/profile',
    name: 'CustomerProfile',
    component: () => import('../customer/pages/CustomerProfile')
  },
  {
    path: '/agency/clients',
    name: 'AgencyClients',
    component: () => import('../agency/pages/AgencyClients')
  },
  {
    path: '/agency/service/:id',
    name: 'ServiceDetails',
    component: () => import('../agency/pages/ServiceDetail'),
    props: true
  },
  {
    path: '/agency/add-service/:id',
    name: 'AddService',
    component: () => import('../agency/pages/AddServices')
  },
  {
    path: '/agency/update-service/:id',
    name: 'UpdateService',
    component: () => import('../agency/pages/UpdateServices')
  },
  {
    path: '/agency/add-service/promotion/:id',
    name: 'PromoteService',
    component: () => import('../agency/pages/PromoteService')
  },
  {
    path: '/services/:id',
    name: 'ServiceDetails',
    component: () => import('../services/pages/ServiceDetails'),
    props: true
  },
  {
    path: '/services/search/:name',
    name: 'ServiceDetails',
    component: () => import('../services/pages/SearchServices'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
