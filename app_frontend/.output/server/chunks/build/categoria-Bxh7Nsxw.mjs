import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categoria",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      required: false,
      default: "content"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hover:cursor-pointer transition-colors hover:border-blue-500 card p-0 card-compact h-fit shadow-sm hover:shadow-blue-400 border-2" }, _attrs))}><div class="p-2"><strong class="text-base p-0">${ssrInterpolate(props.content)}</strong></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/card/categoria.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=categoria-Bxh7Nsxw.mjs.map
