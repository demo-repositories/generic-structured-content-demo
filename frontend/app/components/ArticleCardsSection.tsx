import Link from 'next/link'
import {AllPostsQueryResult} from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import Avatar from '@/app/components/Avatar'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type ArticleCard = AllPostsQueryResult[number]

type ArticleCardsSectionBlock = Extract<PageBuilderSection, {_type: 'articleCardsSection'}> & {
  articles?: ArticleCard[]
}

type BlockProps = {
  block: PageBuilderSection
  pageId: string
  pageType: string
}

export default function ArticleCardsSection({block, pageId, pageType}: BlockProps) {
  const {heading, subheading, articles = []} = block as ArticleCardsSectionBlock

  return (
    <section className="py-16 bg-white">
      <div className="container">
        {(heading || subheading) && (
          <div className="mb-10">
            {heading && <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{heading}</h2>}
            {subheading && <p className="mt-3 text-lg text-gray-500 max-w-2xl">{subheading}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              data-sanity={dataAttr({id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].articles`}).toString()}
              className="border border-gray-200 rounded-sm p-6 bg-gray-50 flex flex-col justify-between transition-colors hover:bg-white relative"
            >
              <Link className="hover:text-brand underline transition-colors" href={`/articles/${article.slug}`}>
                <span className="absolute inset-0 z-10" />
              </Link>
              <div>
                <h3 className="text-xl font-semibold mb-3 leading-snug">{article.title}</h3>
                <p className="line-clamp-3 text-sm leading-6 text-gray-600">{article.excerpt}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                {article.author?.firstName && (
                  <Avatar person={article.author} small={true} />
                )}
                <time className="text-gray-500 text-xs font-mono" dateTime={article.date ?? ''}>
                  <DateComponent dateString={article.date ?? ''} />
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
