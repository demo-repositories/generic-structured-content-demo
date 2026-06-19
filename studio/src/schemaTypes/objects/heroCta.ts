import {defineField, defineType} from 'sanity'

export const heroCta = defineType({
  name: 'heroCta',
  title: 'Hero CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {title: 'buttonText', subtitle: 'style'},
  },
})
