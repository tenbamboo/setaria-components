import{o as n,c as s,b as a}from"./app.910d6ae7.js";const t=a(`<h1 id="\u5FEB\u901F\u5F00\u59CB" tabindex="-1">\u5FEB\u901F\u5F00\u59CB <a class="header-anchor vp-link" href="#\u5FEB\u901F\u5F00\u59CB" aria-hidden="true">#</a></h1><p>\u672C\u8282\u5C06\u4ECB\u7ECD\u5982\u4F55\u5728\u9879\u76EE\u4E2D\u4F7F\u7528 Element Plus\u3002</p><h2 id="\u7528\u6CD5" tabindex="-1">\u7528\u6CD5 <a class="header-anchor vp-link" href="#\u7528\u6CD5" aria-hidden="true">#</a></h2><h3 id="\u5B8C\u6574\u5F15\u5165" tabindex="-1">\u5B8C\u6574\u5F15\u5165 <a class="header-anchor vp-link" href="#\u5B8C\u6574\u5F15\u5165" aria-hidden="true">#</a></h3><p>\u5982\u679C\u4F60\u5BF9\u6253\u5305\u540E\u7684\u6587\u4EF6\u5927\u5C0F\u4E0D\u662F\u5F88\u5728\u4E4E\uFF0C\u90A3\u4E48\u4F7F\u7528\u5B8C\u6574\u5BFC\u5165\u4F1A\u66F4\u65B9\u4FBF\u3002</p><div class="language-typescript"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
<span class="token keyword">import</span> VXETable <span class="token keyword">from</span> <span class="token string">&#39;vxe-table&#39;</span>
<span class="token keyword">import</span> SetariaComponents <span class="token keyword">from</span> <span class="token string">&#39;setaria-components&#39;</span>

<span class="token keyword">import</span> <span class="token string">&#39;vxe-table/lib/style.css&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;element-plus/dist/index.css&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;setaria-components/dist/index.css&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VXETable<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>SetariaComponents<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="volar-\u652F\u6301" tabindex="-1">Volar \u652F\u6301 <a class="header-anchor vp-link" href="#volar-\u652F\u6301" aria-hidden="true">#</a></h4><p>\u5982\u679C\u60A8\u4F7F\u7528 Volar\uFF0C\u8BF7\u5728 <code>tsconfig.json</code> \u4E2D\u901A\u8FC7 <code>compilerOptions.type</code> \u6307\u5B9A\u5168\u5C40\u7EC4\u4EF6\u7C7B\u578B\u3002</p><div class="language-json"><pre><code><span class="token comment">// tsconfig.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;setaria-components/global&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,9),p=[t],r='{"title":"\u5FEB\u901F\u5F00\u59CB","description":"","frontmatter":{"title":"\u5FEB\u901F\u5F00\u59CB","lang":"zh-CN"},"headers":[{"level":2,"title":"\u7528\u6CD5","slug":"\u7528\u6CD5"},{"level":3,"title":"\u5B8C\u6574\u5F15\u5165","slug":"\u5B8C\u6574\u5F15\u5165"}],"relativePath":"zh-CN/guide/quickstart.md","lastUpdated":1701245625000}',e={},u=Object.assign(e,{__name:"quickstart",setup(o){return(c,l)=>(n(),s("div",null,p))}});export{r as __pageData,u as default};
