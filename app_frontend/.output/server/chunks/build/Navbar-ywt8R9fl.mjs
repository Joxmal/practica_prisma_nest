import { useSSRContext, defineAsyncComponent, defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode } from 'vue';
import { _ as __nuxt_component_1 } from './nuxt-link-BTR8m5CI.mjs';
import _sfc_main$2 from './Icon-CIuK0Lje.mjs';
import { g as useState } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';

const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Base",
  __ssrInlineRender: true,
  setup(__props) {
    useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "swap swap-rotate" }, _attrs))}><input type="checkbox" class="theme-controller"><svg class="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path></svg><svg class="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path></svg></label>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/themeController/Base.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const icon1 = "material-symbols:admin-panel-settings";
const routeAdmin = [
  { icon: icon1, name: "Crear Post", pathName: "admin-dasboard-post-crearPost" },
  { icon: icon1, name: "Crear Cooperador", pathName: "admin-dasboard-cooperador-crearCooperador" },
  { icon: icon1, name: "Crear Categoria", pathName: "admin-dasboard-categoria-crearCategoria" },
  { icon: icon1, name: "Subir imagen", pathName: "admin-dasboard-subirImagen" },
  { icon: icon1, name: "Imagenes carrusel", pathName: "admin-dasboard-carrusel-imagenes" }
];
const routeVisitors = [
  { icon: "icon-park-outline:cooperative-handshake", name: "Cooperadores" },
  { icon: "octicon:sponsor-tiers-16", name: "Patrocinadores" }
];
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./index-BET8TpCk.mjs').then((c) => c.default || c));
const __nuxt_component_3_lazy = defineAsyncComponent(() => import('./logout-p7v1dY-S.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { user, loggedIn, token } = ([__temp, __restore] = withAsyncContext(() => useJwtAuth()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyBaseDrawer = __nuxt_component_0_lazy;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_Icon = _sfc_main$2;
      const _component_LazyAdminLogout = __nuxt_component_3_lazy;
      const _component_BaseThemeControllerBase = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "navbar bg-base-100" }, _attrs))}><div class="navbar-start">`);
      _push(ssrRenderComponent(_component_LazyBaseDrawer, {
        routesNameAdmin: unref(routeAdmin),
        routesName: unref(routeVisitors)
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: { name: "index" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              class: "hover:text-primary",
              name: "uim:house-user",
              size: "40"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                class: "hover:text-primary",
                name: "uim:house-user",
                size: "40"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(loggedIn)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          NuxtLink: "",
          to: { name: "admin-dasboard" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                class: "hover:text-primary",
                name: "material-symbols:admin-panel-settings",
                size: "40"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  class: "hover:text-primary",
                  name: "material-symbols:admin-panel-settings",
                  size: "40"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="navbar-center hidden lg:flex"></div><div class="navbar-end">`);
      if (unref(loggedIn)) {
        _push(ssrRenderComponent(_component_LazyAdminLogout, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_BaseThemeControllerBase, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Navbar-ywt8R9fl.mjs.map
