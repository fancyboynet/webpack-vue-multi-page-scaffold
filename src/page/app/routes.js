import article from './router/article'
import article_list from './router/article_list'
import material from './router/material'
import data from './router/data'
import author from './router/author_manager'
import add from './router/add_article'
import edit from './router/edit_article'
import plate from './router/plate.vue'
import examine from './router/examine_article'
import comment from './router/article_comment'
import recommendAdd from './router/recommend_add'
import recommend from './router/recommend'
import recommendList from './router/recommend_list'

import Main from './router/Main.vue'
import Login from './router/Login.vue'

import guide from 'components/data-guide'
import dataAdminArticle from 'components/data-admin-article'
import dataArticle from 'components/data-article'
import dataRecommend from 'components/data-admin-recommend'

import Subject from './router/subject/index'
import SubjectList from './router/subject/list'
import SubjectCreate from './router/subject/create/index'
import SubjectSetting from './router/subject/setting'
import DataSubject from './router/data/subject'

const ROUTES = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/article/list',
    children: [
      {
        path: '/article',
        name: 'article',
        component: article,
        redirect: '/article/list',

        children: [
          {
            path: 'list',
            component: article_list
          },
          {
            path: 'add',
            component: add
          },
          {
            path: 'edit',
            component: edit
          },
          {
            path: 'examine',
            component: examine
          },
          {
            path:'comment',
            component: comment
          }
        ]
      },
      {
        path: '/material',
        component: material
      },
      {
        path: '/data',
        component: data,
        children:[

        ]
      },
      {
        path: '/data/guide',
        component: guide
      },
      {
        path: '/data/article',
        component: dataArticle
      },
      {
        path:'/data/adminArticle',
        component: dataAdminArticle
      },
      {
        path: '/data/recommend',
        component: dataRecommend
      },
      {
        path: '/data/subject',
        component: DataSubject
      },
      {
        path: '/author_manager',
        component: author
      },
      {
        path: '/plate',
        component: plate
      },
      {
        path: '/recommend',
        name: 'recommend',
        component: recommend,
        //redirect: '/recommend/list',
        children: [
          {
            path: 'list',
            component: recommendList
          },
          {
            path: 'add',
            component: recommendAdd
          },
          {
            path: 'edit',
            component: edit
          }
        ]
      },
      {
        path: '/subject',
        name: '/subject',
        component: Subject,
        redirect: '/subject/list',
        children: [
          {
            path: 'list',
            component: SubjectList
          },
          {
            path: 'create',
            component: SubjectCreate
          },
          {
            path: 'edit/:id',
            component: SubjectCreate
          },
          {
            path: 'setting',
            component: SubjectSetting
          }
        ]
      }
    ]
  }
]

export default ROUTES
