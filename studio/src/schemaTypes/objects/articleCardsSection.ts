import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const articleCardsSection = defineType({
  name: 'articleCardsSection',
  title: 'Article Cards',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'article'}]})],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      article0: 'articles.0.title',
    },
    prepare({title, article0}) {
      return {
        title: title || 'Article Cards',
        subtitle: article0 ? `Starting with: ${article0}` : 'No articles selected',
      }
    },
  },
})
