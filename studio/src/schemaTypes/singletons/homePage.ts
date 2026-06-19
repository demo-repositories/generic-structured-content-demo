import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Banner',
      type: 'heroBanner',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [{type: 'callToAction'}, {type: 'infoSection'}, {type: 'articleCardsSection'}],
    }),
  ],
  preview: {
    select: {title: 'hero.title'},
    prepare({title}) {
      return {title: title || 'Home Page', subtitle: 'Singleton'}
    },
  },
})
