import {Suspense} from 'react'

import {AllPosts} from '@/app/components/Posts'
import HeroBanner from '@/app/components/HeroBanner'
import PageBuilder from '@/app/components/PageBuilder'
import {homePageQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: homePage} = await sanityFetch({query: homePageQuery})

  return (
    <>
      {homePage?.hero && (
        <HeroBanner hero={homePage.hero} pageId={homePage._id} />
      )}

      {homePage?.pageBuilder && homePage.pageBuilder.length > 0 && (
        <PageBuilder
          pageBuilder={homePage.pageBuilder}
          id={homePage._id}
          type={homePage._type}
        />
      )}

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>
              <AllPosts />
            </Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
