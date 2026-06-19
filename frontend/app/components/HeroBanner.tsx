import {stegaClean} from '@sanity/client/stega'

import Image from '@/app/components/SanityImage'
import ResolvedLink from '@/app/components/ResolvedLink'
import {dataAttr} from '@/sanity/lib/utils'
import {HomePageHero} from '@/sanity/lib/types'
import {DereferencedLink} from '@/sanity/lib/types'

type HeroBannerProps = {
  hero: HomePageHero
  pageId: string
}

export default function HeroBanner({hero, pageId}: HeroBannerProps) {
  const {title, subtitle, image, ctas = [], textPosition} = hero

  const position = stegaClean(textPosition) ?? 'left'

  const contentAlignment = {
    left: 'items-start text-left',
    center: 'items-center text-center mx-auto',
    right: 'items-end text-right ml-auto',
  }[position] ?? 'items-start text-left'

  return (
    <section
      className="relative flex items-center min-h-[70vh] overflow-hidden bg-black"
      data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero'}).toString()}
    >
      {/* Background image */}
      {image?.asset?._ref && (
        <div className="absolute inset-0">
          <Image
            id={image.asset._ref}
            alt={image.alt ?? ''}
            width={1920}
            crop={image.crop}
            hotspot={image.hotspot}
            mode="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Tile pattern fallback when no image */}
      {!image?.asset?._ref && (
        <div className="absolute inset-0 bg-[url(/images/tile-1-white.png)] bg-size-[5px] opacity-10" />
      )}

      {/* Content */}
      <div className="container relative z-10 py-20 lg:py-32">
        <div className={`flex flex-col gap-6 max-w-2xl ${contentAlignment}`}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
            data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.title'}).toString()}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-lg md:text-xl text-gray-300 max-w-xl"
              data-sanity={dataAttr({
                id: pageId,
                type: 'homePage',
                path: 'hero.subtitle',
              }).toString()}
            >
              {subtitle}
            </p>
          )}

          {ctas && ctas.length > 0 && (
            <div
              className={`flex flex-wrap gap-3 ${position === 'center' ? 'justify-center' : position === 'right' ? 'justify-end' : ''}`}
            >
              {ctas.map((cta) => {
                const isPrimary = stegaClean(cta.style) !== 'secondary'
                return (
                  <ResolvedLink
                    key={cta._key}
                    link={cta.link as DereferencedLink}
                    className={
                      isPrimary
                        ? 'rounded-full font-mono text-sm py-3 px-6 bg-brand text-black hover:opacity-90 transition-opacity duration-200 whitespace-nowrap'
                        : 'rounded-full font-mono text-sm py-3 px-6 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200 whitespace-nowrap'
                    }
                  >
                    {cta.buttonText}
                  </ResolvedLink>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
