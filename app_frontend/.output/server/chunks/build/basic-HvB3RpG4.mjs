import { defineComponent, ref, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  props: {
    tipo: {
      type: String,
      default: "alert-info"
    },
    duration: {
      type: Number,
      default: 3e3
    },
    active_count: {
      type: Number
    },
    text: String
  },
  setup(__props) {
    const props = __props;
    const hiddenToast = ref(true);
    watch(() => props.active_count, (newValue, oldValue) => {
      if (newValue !== void 0 && oldValue !== void 0) {
        if (newValue > oldValue) {
          hiddenToast.value = false;
          setTimeout(() => {
            hiddenToast.value = true;
          }, props.duration);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [{ "invisible": unref(hiddenToast) }, "toast toast-top toast-center transition-all duration-500 animate-pulse"]
      }, _attrs))}><div class="${ssrRenderClass([props.tipo, "alert"])}"><span>${ssrInterpolate(props.text)}</span></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/toast/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=basic-HvB3RpG4.mjs.map
