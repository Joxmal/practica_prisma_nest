import _sfc_main$1 from './logout-p7v1dY-S.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { defineComponent, withAsyncContext, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import './Icon-CIuK0Lje.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const { user, loggedIn, token } = ([__temp, __restore] = withAsyncContext(() => useJwtAuth()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLogout = _sfc_main$1;
      _push(`<!--[--> dasboard <hr>`);
      _push(ssrRenderComponent(_component_AdminLogout, null, null, _parent));
      _push(`<hr>`);
      if (unref(loggedIn)) {
        _push(`<div>${ssrInterpolate(unref(token))} <hr> ${ssrInterpolate(unref(user))} <hr> ${ssrInterpolate(unref(loggedIn))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DCNM1R81.mjs.map
