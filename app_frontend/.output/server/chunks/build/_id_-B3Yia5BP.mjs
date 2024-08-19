import { _ as __nuxt_component_0 } from './basic-BGdgPt11.mjs';
import { defineAsyncComponent, defineComponent, ref, withAsyncContext, resolveDirective, unref, useSSRContext } from 'vue';
import { s as useRoute$1, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-B0jF0AGP.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './entry-styles-3.mjs-ZOO-Zy7H.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./server.mjs').then(function(n) {
  return n.A;
}).then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const route = useRoute$1();
    const queryCategoria = ref(void 0);
    const parrafos = ref();
    const fetchPosts = async () => {
      var _a;
      const { data, status, error } = await useFetch(`${config.public.NUXT_API_URL}/post/${route.params.id}`, {
        query: {
          categoria: queryCategoria.value
        }
      }, "$LVhHqBUbvB");
      parrafos.value = (_a = data.value) == null ? void 0 : _a.content;
      return { data, status, error };
    };
    const { data: dataPosts, status: dataPostsStatus, error: errorDataPoST } = ([__temp, __restore] = withAsyncContext(() => fetchPosts()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_CarruselBasic = __nuxt_component_0;
      const _component_LazyClientOnly = __nuxt_component_1_lazy;
      resolveDirective("lazy-load");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_CarruselBasic, {
        images: (_a = unref(dataPosts)) == null ? void 0 : _a.images,
        class: "-z-50"
      }, null, _parent));
      if (unref(dataPostsStatus) === "pending") {
        _push(`<div class="flex flex-col gap-4 mt-2"><div class="skeleton h-32 w-full"></div><div class="skeleton h-4 w-28"></div><div class="skeleton h-4 w-full"></div><div class="skeleton h-4 w-full"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h4 class="text-6xl text-center my-4">${ssrInterpolate((_b = unref(dataPosts)) == null ? void 0 : _b.title)}</h4><div class=""><div class="">`);
      _push(ssrRenderComponent(_component_LazyClientOnly, null, {}, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/[category]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-B3Yia5BP.mjs.map
