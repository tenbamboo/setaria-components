import{o,c,b as t,g as n,y as a,a as p,B as l}from"./app.c7e5bb3d.js";const r={href:"https://vueuse.org/core/useDark/",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},i={href:"https://github.com/setaria-components/setaria-components-vite-starter",class:"vp-link",target:"_blank",rel:"noopener noreferrer"},g='{"title":"\u6697\u9ED1\u6A21\u5F0F","description":"","frontmatter":{"title":"\u6697\u9ED1\u6A21\u5F0F","lang":"zh-CN"},"headers":[{"level":2,"title":"\u5982\u4F55\u542F\u7528\uFF1F","slug":"\u5982\u4F55\u542F\u7528\uFF1F"},{"level":2,"title":"\u81EA\u5B9A\u4E49\u53D8\u91CF","slug":"\u81EA\u5B9A\u4E49\u53D8\u91CF"},{"level":3,"title":"\u901A\u8FC7 CSS","slug":"\u901A\u8FC7-css"},{"level":3,"title":"\u901A\u8FC7 SCSS","slug":"\u901A\u8FC7-scss"}],"relativePath":"zh-CN/guide/dark-mode.md","lastUpdated":1699431275000}',k={},h=Object.assign(k,{__name:"dark-mode",setup(u){return(d,s)=>{const e=l;return o(),c("div",null,[s[6]||(s[6]=t(`<h1 id="\u6697\u9ED1\u6A21\u5F0F" tabindex="-1">\u6697\u9ED1\u6A21\u5F0F <span class="vp-tag">2.2.0</span> <a class="header-anchor vp-link" href="#\u6697\u9ED1\u6A21\u5F0F" aria-hidden="true">#</a></h1><p>\u73B0\u5728\uFF0CElement Plus \u7EC8\u4E8E\u652F\u6301\u4E86\u6697\u9ED1\u6A21\u5F0F\uFF01</p><p>\u6211\u4EEC\u63D0\u53D6\u5E76\u6574\u7406\u4E86\u6240\u6709\u7684\u8BBE\u8BA1\u53D8\u91CF\uFF0C\u5E76\u901A\u8FC7 CSS Vars \u6280\u672F\u5B9E\u73B0\u52A8\u6001\u66F4\u65B0\u4E3B\u9898\u3002</p><h2 id="\u5982\u4F55\u542F\u7528\uFF1F" tabindex="-1">\u5982\u4F55\u542F\u7528\uFF1F <a class="header-anchor vp-link" href="#\u5982\u4F55\u542F\u7528\uFF1F" aria-hidden="true">#</a></h2><p>\u9996\u5148\u4F60\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u5F00\u5173\u6765\u63A7\u5236 <code>\u6697\u9ED1\u6A21\u5F0F</code> \u7684 class \u7C7B\u540D\u3002</p><blockquote><p>\u5982\u679C\u60A8\u53EA\u9700\u8981\u6697\u8272\u6A21\u5F0F\uFF0C\u53EA\u9700\u5728 html \u4E0A\u6DFB\u52A0\u4E00\u4E2A\u540D\u4E3A <code>dark</code> \u7684\u7C7B \u3002</p></blockquote><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>dark<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,7)),n("blockquote",null,[n("p",null,[s[1]||(s[1]=a("\u5982\u679C\u60A8\u60F3\u52A8\u6001\u5207\u6362\uFF0C\u5EFA\u8BAE\u4F7F\u7528 ")),n("a",r,[s[0]||(s[0]=a(" useDark | VueUse")),p(e,{class:"link-icon"})]),s[2]||(s[2]=a("\u3002"))])]),s[7]||(s[7]=t(`<p>\u53EA\u9700\u8981\u5982\u4E0B\u5728\u9879\u76EE\u5165\u53E3\u6587\u4EF6\u4FEE\u6539\u4E00\u884C\u4EE3\u7801\uFF1A</p><div class="language-ts"><pre><code><span class="token comment">// main.ts</span>
<span class="token comment">// \u5982\u679C\u53EA\u60F3\u5BFC\u5165css\u53D8\u91CF</span>
<span class="token keyword">import</span> <span class="token string">&#39;setaria-components/theme-chalk/dark/css-vars.css&#39;</span>
</code></pre></div>`,2)),n("blockquote",null,[n("p",null,[s[4]||(s[4]=a("\u4E5F\u53EF\u4EE5\u53C2\u8003\u6211\u4EEC\u63D0\u4F9B\u7684 ")),n("a",i,[s[3]||(s[3]=a("setaria-components-vite-starter \u6A21\u7248")),p(e,{class:"link-icon"})]),s[5]||(s[5]=a(" \u4F8B\u5B50\u3002"))])]),s[8]||(s[8]=t(`<h2 id="\u81EA\u5B9A\u4E49\u53D8\u91CF" tabindex="-1">\u81EA\u5B9A\u4E49\u53D8\u91CF <a class="header-anchor vp-link" href="#\u81EA\u5B9A\u4E49\u53D8\u91CF" aria-hidden="true">#</a></h2><h3 id="\u901A\u8FC7-css" tabindex="-1">\u901A\u8FC7 CSS <a class="header-anchor vp-link" href="#\u901A\u8FC7-css" aria-hidden="true">#</a></h3><p>\u76F4\u63A5\u8986\u76D6\u5BF9\u5E94\u7684 css \u53D8\u91CF\u5373\u53EF</p><p>\u50CF\u8FD9\u6837\uFF0C\u65B0\u5EFA\u4E00\u4E2A <code>styles/dark/css-vars.css</code>\u6587\u4EF6:</p><div class="language-css"><pre><code><span class="token selector">html.dark</span> <span class="token punctuation">{</span>
  <span class="token comment">/* \u81EA\u5B9A\u4E49\u6DF1\u8272\u80CC\u666F\u989C\u8272 */</span>
  <span class="token property">--el-bg-color</span><span class="token punctuation">:</span> #626aef<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>\u5728 Element Plus \u7684\u6837\u5F0F\u4E4B\u540E\u5BFC\u5165\u5B83</p><div class="language-ts"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> <span class="token string">&#39;setaria-components/theme-chalk/dark/css-vars.css&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./styles/dark/css-vars.css&#39;</span>
</code></pre></div><h3 id="\u901A\u8FC7-scss" tabindex="-1">\u901A\u8FC7 SCSS <a class="header-anchor vp-link" href="#\u901A\u8FC7-scss" aria-hidden="true">#</a></h3><p>\u5982\u679C\u60A8\u4F7F\u7528 scss\uFF0C\u60A8\u4E5F\u53EF\u4EE5\u5BFC\u5165 scss \u6587\u4EF6\u6765\u5B9E\u73B0\u4E00\u6837\u7684\u6548\u679C</p><blockquote><p>\u60A8\u53EF\u4EE5\u53C2\u8003 <a href="./theming.html" class="vp-link">\u81EA\u5B9A\u4E49\u4E3B\u9898</a> \u83B7\u53D6\u66F4\u591A\u4FE1\u606F\u3002</p></blockquote><div class="language-scss"><pre><code><span class="token comment">// styles/element/index.scss</span>
<span class="token comment">/* \u8986\u76D6\u4F60\u9700\u8981\u7684\u53D8\u91CF */</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;setaria-components/theme-chalk/src/dark/var.scss&#39;</span> <span class="token module-modifier keyword">with</span> <span class="token punctuation">(</span>
  <span class="token property"><span class="token variable">$bg-color</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token string">&#39;page&#39;</span><span class="token punctuation">:</span> #0a0a0a<span class="token punctuation">,</span>
    <span class="token string">&#39;&#39;</span><span class="token punctuation">:</span> #626aef<span class="token punctuation">,</span>
    <span class="token string">&#39;overlay&#39;</span><span class="token punctuation">:</span> #1d1e1f<span class="token punctuation">,</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-ts"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> <span class="token string">&#39;./styles/element/index.scss&#39;</span>

<span class="token comment">// \u53EA\u60F3\u5BFC\u5165scss\uFF1F</span>
<span class="token comment">// import &#39;setaria-components/theme-chalk/src/dark/css-vars.scss&#39;</span>
</code></pre></div>`,12))])}}});export{g as __pageData,h as default};
