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

function CtaButtons({
  ctas,
  pageId,
}: {
  ctas: NonNullable<HomePageHero['ctas']>
  pageId: string
}) {
  return (
    <div
      className="flex flex-wrap gap-3"
      data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.ctas'}).toString()}
    >
      {ctas.map((cta) => {
        const style = stegaClean(cta.style) ?? 'primary'
        const className =
          style === 'primary'
            ? 'rounded-full font-mono text-sm py-3 px-6 bg-brand text-black hover:opacity-90 transition-opacity duration-200 whitespace-nowrap'
            : style === 'contrast'
              ? 'rounded-full font-mono text-sm py-3 px-6 bg-white text-black hover:opacity-90 transition-opacity duration-200 whitespace-nowrap'
              : 'rounded-full font-mono text-sm py-3 px-6 border border-current hover:opacity-70 transition-opacity duration-200 whitespace-nowrap'
        return (
          <ResolvedLink
            key={cta._key}
            link={cta.link as DereferencedLink}
            className={
              className
            }
          >
            {cta.buttonText}
          </ResolvedLink>
        )
      })}
    </div>
  )
}

function TextOnImage({hero, pageId}: HeroBannerProps) {
  const {title, subtitle, image, ctas = []} = hero
  return (
    <section
      className="relative flex items-center min-h-[70vh] overflow-hidden bg-black"
      data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero'}).toString()}
    >
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

      {!image?.asset?._ref && (
        <div className="absolute inset-0 bg-[url(/images/tile-1-white.png)] bg-size-[5px] opacity-10" />
      )}

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
            data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.title'}).toString()}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-lg md:text-xl text-gray-300 max-w-xl"
              data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.subtitle'}).toString()}
            >
              {subtitle}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <CtaButtons ctas={ctas} pageId={pageId} />
          )}
        </div>
      </div>
    </section>
  )
}

function Stacked({hero, pageId}: HeroBannerProps) {
  const {title, subtitle, image, ctas = []} = hero
  return (
    <section
      className="overflow-hidden bg-white"
      data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero'}).toString()}
    >
      <div className="container py-16 lg:py-24">
        <div className="flex flex-col gap-6 max-w-3xl">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black"
            data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.title'}).toString()}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-lg md:text-xl text-gray-600 max-w-xl"
              data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.subtitle'}).toString()}
            >
              {subtitle}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <CtaButtons ctas={ctas} pageId={pageId} />
          )}
        </div>
      </div>

      {image?.asset?._ref && (
        <div className="w-full aspect-[16/7] overflow-hidden">
          <Image
            id={image.asset._ref}
            alt={image.alt ?? ''}
            width={1920}
            crop={image.crop}
            hotspot={image.hotspot}
            mode="cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  )
}

function SideBySide({hero, pageId}: HeroBannerProps) {
  const {title, subtitle, image, ctas = []} = hero
  return (
    <section
      className="overflow-hidden bg-white"
      data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero'}).toString()}
    >
      <div className="container grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24 min-h-[70vh]">
        <div className="flex flex-col gap-6">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-black"
            data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.title'}).toString()}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-lg md:text-xl text-gray-600"
              data-sanity={dataAttr({id: pageId, type: 'homePage', path: 'hero.subtitle'}).toString()}
            >
              {subtitle}
            </p>
          )}
          {ctas && ctas.length > 0 && (
            <CtaButtons ctas={ctas} pageId={pageId} />
          )}
        </div>

        {image?.asset?._ref && (
          <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              id={image.asset._ref}
              alt={image.alt ?? ''}
              width={900}
              crop={image.crop}
              hotspot={image.hotspot}
              mode="cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default function HeroBanner({hero, pageId}: HeroBannerProps) {
  const layout = stegaClean(hero.layout) ?? 'textOnImage'

  if (layout === 'stacked') return <Stacked hero={hero} pageId={pageId} />
  if (layout === 'sideBySide') return <SideBySide hero={hero} pageId={pageId} />
  return <TextOnImage hero={hero} pageId={pageId} />
}
