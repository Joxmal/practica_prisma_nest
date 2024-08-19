import _sfc_main$1 from './IconTw-CfM8SxUn.mjs';
import __nuxt_component_1 from './IconSvg-CeYqyohg.mjs';
import { i as useAppConfig } from './server.mjs';
import { defineComponent, computed, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    icon: {},
    name: {},
    tw: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const iconName = computed(() => {
      var _a;
      const name = props.icon || props.name || "";
      if (((_a = appConfig.nuxtIcon) == null ? void 0 : _a.aliases) && appConfig.nuxtIcon.aliases[name]) {
        return appConfig.nuxtIcon.aliases[name];
      }
      return name;
    });
    const useTwIcon = computed(() => {
      var _a, _b, _c;
      if (props.tw || ((_a = appConfig.nuxtIcon) == null ? void 0 : _a.forceTailwind))
        return true;
      if (iconName.value.includes(":"))
        return false;
      if ((_c = (_b = appConfig == null ? void 0 : appConfig.nuxtIcon) == null ? void 0 : _b.resolvedPrefixes) == null ? void 0 : _c.find((element) => {
        return iconName.value.startsWith(element);
      }))
        return true;
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconTw = _sfc_main$1;
      const _component_IconSvg = __nuxt_component_1;
      if (useTwIcon.value) {
        _push(ssrRenderComponent(_component_IconTw, mergeProps({ name: iconName.value }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(_component_IconSvg, mergeProps({
          name: iconName.value
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt-icon-tw@0.1.4_@nuxtjs+tailwindcss@6.12.1_magicast@0.3.4_rollup@4.20.0__magicast@0.3.4_ro_eo47rsr3ycbslhdw6hcrshdb2q/node_modules/nuxt-icon-tw/dist/runtime/Icon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Icon-CIuK0Lje.mjs.map
