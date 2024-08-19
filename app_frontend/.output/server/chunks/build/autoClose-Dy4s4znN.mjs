import { defineComponent, ref, watch, unref, useSSRContext } from 'vue';
import { ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "autoClose",
  __ssrInlineRender: true,
  props: {
    modalTitulo: String,
    modalId: String,
    hidden: Boolean
  },
  setup(__props, { expose: __expose }) {
    const checkbox_modal = ref();
    const props = __props;
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        checkbox_modal.value = false;
      }
    };
    const montado = ref(false);
    watch(() => checkbox_modal.value, () => {
      if (checkbox_modal.value === true && montado.value === false) {
        (void 0).addEventListener("keydown", handleKeydown);
        montado.value = true;
      }
    });
    const boton = ref(null);
    __expose({ boton });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><label class="${ssrRenderClass([{ "hidden": __props.hidden }, "btn btn-sm btn-outline btn-accent"])}"${ssrRenderAttr("for", props.modalId)}>${ssrInterpolate(props.modalTitulo)}</label><input${ssrIncludeBooleanAttr(Array.isArray(unref(checkbox_modal)) ? ssrLooseContain(unref(checkbox_modal), null) : unref(checkbox_modal)) ? " checked" : ""} type="checkbox"${ssrRenderAttr("id", props.modalId)} class="modal-toggle"><div class="modal" role="dialog"><div class="modal-box w-11/12 relative max-w-5xl"><h3 class="text-lg font-bold text-center">${ssrInterpolate(props.modalTitulo)}</h3>`);
      ssrRenderSlot(_ctx.$slots, "contenido", { class: "w-full h-full" }, null, _push, _parent);
      _push(`<div class="modal-action"></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/autoClose.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=autoClose-Dy4s4znN.mjs.map
