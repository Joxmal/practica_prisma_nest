import { _ as __nuxt_component_0 } from './basic-BGdgPt11.mjs';
import { _ as _sfc_main$2 } from './categoria-Bxh7Nsxw.mjs';
import { useSSRContext, defineComponent, withAsyncContext, ref, watch, unref, withCtx, openBlock, createBlock, Fragment, renderList, resolveDirective, mergeProps } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import { b as useRouter$1, c as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch-B0jF0AGP.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { TransitionFade } from '@morev/vue-transitions';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "post",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String
    },
    title: {
      type: String,
      default: "titulo"
    },
    summary: {
      type: String,
      default: "resumen"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _directive_lazy_load = resolveDirective("lazy-load");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group card bg-base-300 shadow-md border border-primary hover:shadow-pink-500 hover:cursor-pointer" }, _attrs))}><figure class=""><img v-lazy-load ${ssrRenderAttrs(_temp0 = mergeProps({
        "data-src": props.image,
        alt: "Shoes",
        class: "h-50 w-full object-contain group-hover:scale-125 transition-all duration-500 aspect-[9/6]"
      }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</figure><div class="mb-2"><h5 class="text-xl text-wrap text-center">${ssrInterpolate(props.title)}</h5><p class="px-2">${ssrInterpolate(props.summary)}</p><div class="mx-2 badge badge-secondary">Nuevo</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/post.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const route = useRouter$1();
    const selectCategoria = (categoriaName) => {
      queryCategoria.value = categoriaName;
    };
    const config = useRuntimeConfig();
    const { data: dataCategorias } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.NUXT_API_URL}/categorias`, "$pqtWcjQkdb")), __temp = await __temp, __restore(), __temp);
    const queryCategoria = ref(void 0);
    const { token, loggedIn } = ([__temp, __restore] = withAsyncContext(() => useJwtAuth()), __temp = await __temp, __restore(), __temp);
    const queryTitle = ref(null);
    const fetchPosts = async () => {
      const url = `${config.public.NUXT_API_URL}/post${token.value ? `/?token=${token.value}` : ""}`;
      console.log(url);
      const { data, status } = await useFetch(url, {
        query: {
          categoria: queryCategoria.value,
          titleSearch: queryTitle.value ? queryTitle.value : null
        },
        lazy: true
      }, "$cmRBlMwAGX");
      return { data, status };
    };
    const { data: dataPosts, status: dataPostsStatus } = ([__temp, __restore] = withAsyncContext(() => fetchPosts()), __temp = await __temp, __restore(), __temp);
    watch(queryCategoria, async (newCategoria) => {
      const { data, status } = await fetchPosts();
      dataPosts.value = data.value;
      console.log(data.value);
      dataPostsStatus.value = status.value;
    });
    let timeout;
    watch(queryTitle, (newQuery) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const { data, status } = await fetchPosts();
        dataPosts.value = data.value;
        console.log(data.value);
        dataPostsStatus.value = status.value;
      }, 1e3);
    });
    function moverseAlPost(category, id) {
      route.push(`post/${category}/${id}`);
    }
    const { data: dataCarrusel } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.NUXT_API_URL}/images/carrusel`, "$P8rApiifAs")), __temp = await __temp, __restore(), __temp);
    const secureUrlCarrusel = (_a = dataCarrusel.value) == null ? void 0 : _a.map((element) => `${config.public.NUXT_API_URL}/post/files/${element.id}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarruselBasic = __nuxt_component_0;
      const _component_CardCategoria = _sfc_main$2;
      const _component_CardPost = _sfc_main$1;
      _push(`<!--[-->`);
      if (unref(loggedIn)) {
        _push(`<div>${ssrInterpolate(`${unref(config).public.NUXT_API_URL}/post/${unref(queryCategoria)}`)} ${ssrInterpolate(unref(queryCategoria))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_CarruselBasic, {
        images: unref(secureUrlCarrusel),
        class: "-z-50"
      }, null, _parent));
      _push(`<div class="flex flex-wrap gap-2 justify-center my-12">`);
      _push(ssrRenderComponent(_component_CardCategoria, {
        class: { "border-primary shadow-md shadow-blue-500": unref(queryCategoria) === "" },
        onClick: ($event) => selectCategoria(""),
        content: "todos"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(dataCategorias), (categoria) => {
        _push(ssrRenderComponent(_component_CardCategoria, {
          class: { "border-primary shadow-md shadow-blue-500": unref(queryCategoria) === categoria.name },
          onClick: ($event) => selectCategoria(categoria.name),
          content: categoria.name
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="bg-base-content"><label class="input input-bordered flex items-center my-2"><input${ssrRenderAttr("value", unref(queryTitle))} type="text" class="grow mr-2" placeholder="Search"><div class="border bg-secondary p-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">${ssrInterpolate(unref(queryCategoria))}</div></label></div><div class="min-h-72">`);
      _push(ssrRenderComponent(unref(TransitionFade), {
        class: "grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-6 xl:gap-8 my-2",
        group: "",
        tag: "ul"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(dataPosts), (post, index) => {
              _push2(ssrRenderComponent(_component_CardPost, {
                key: post.title,
                onClick: ($event) => moverseAlPost(post.title, post.id),
                image: post.images[0],
                title: post.title,
                summary: post.summary
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(dataPosts), (post, index) => {
                return openBlock(), createBlock(_component_CardPost, {
                  key: post.title,
                  onClick: ($event) => moverseAlPost(post.title, post.id),
                  image: post.images[0],
                  title: post.title,
                  summary: post.summary
                }, null, 8, ["onClick", "image", "title", "summary"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DEZOmLCC.mjs.map
