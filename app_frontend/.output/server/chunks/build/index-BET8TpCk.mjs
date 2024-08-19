import _sfc_main$1 from './Icon-CIuK0Lje.mjs';
import { _ as __nuxt_component_1 } from './nuxt-link-BTR8m5CI.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './IconTw-CfM8SxUn.mjs';
import './server.mjs';
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
import './IconSvg-CeYqyohg.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    routesNameAdmin: {
      type: Object
    },
    routesName: {
      type: Object
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const { user, loggedIn, token } = ([__temp, __restore] = withAsyncContext(() => useJwtAuth()), __temp = await __temp, __restore(), __temp);
    ref(false);
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><input id="my-drawer" type="checkbox" class="drawer-toggle"><div class="drawer-content"><label for="my-drawer" class="btn btn-primary drawer-button"><svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"></path></svg></label></div><div class="drawer-side z-50"><label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label><ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4"><!--[-->`);
      ssrRenderList(props.routesName, (route) => {
        _push(`<li><a>`);
        _push(ssrRenderComponent(_component_Icon, {
          class: "hover:text-primary",
          name: route.icon,
          size: "40"
        }, null, _parent));
        _push(` ${ssrInterpolate(route.name)}</a></li>`);
      });
      _push(`<!--]-->`);
      if (unref(loggedIn)) {
        _push(`<!--[-->`);
        ssrRenderList(props.routesNameAdmin, (route) => {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { name: route.pathName }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  class: "hover:text-primary",
                  name: route.icon,
                  size: "40"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(route.name)}`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    class: "hover:text-primary",
                    name: route.icon,
                    size: "40"
                  }, null, 8, ["name"]),
                  createTextVNode(" " + toDisplayString(route.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Drawer/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BET8TpCk.mjs.map
