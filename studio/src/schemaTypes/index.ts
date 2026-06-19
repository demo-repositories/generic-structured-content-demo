import {author} from './documents/author'
import {page} from './documents/page'
import {article} from './documents/article'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {articleCardsSection} from './objects/articleCardsSection'
import {heroCta} from './objects/heroCta'
import {heroBanner} from './objects/heroBanner'
import {settings} from './singletons/settings'
import {homePage} from './singletons/homePage'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

export const schemaTypes = [
  // Singletons
  settings,
  homePage,
  // Documents
  page,
  article,
  author,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  articleCardsSection,
  heroCta,
  heroBanner,
  callToAction,
  link,
]
