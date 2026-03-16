import { resolvePageMeta, injectMetaIntoHtml } from "./server/ssrMeta";

const meta1 = resolvePageMeta('/projects/ransomes-wharf-battersea');
console.log('Project page meta title:', meta1.title);
console.log('Project page meta status:', meta1.status);

const meta2 = resolvePageMeta('/some-random-page');
console.log('Unknown route status:', meta2.status);
console.log('Unknown route title:', meta2.title);

const meta3 = resolvePageMeta('/blog/battersea-property-investment-2026');
console.log('Blog post title:', meta3.title);

// Test injection
const testHtml = '<html><head><title>CM2 | Private Property Investment Concierge</title><meta name="description" content="old desc"/></head><body><div id="root"></div></body></html>';
const injected = injectMetaIntoHtml(testHtml, meta1);
const titleMatch = injected.match(/<title>([^<]+)<\/title>/);
console.log('Injected title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
