import _sfc_main$2 from './autoClose-Dy4s4znN.mjs';
import { u as useAdminCooperadorStore, _ as _sfc_main$3 } from './search-KgFQMuu_.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import _sfc_main$1 from './crearCategoria-BJ9s_51C.mjs';
import './TransitionFade-g9mVFPqc.mjs';
import '@morev/vue-transitions';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './composables-TtYWI-F6.mjs';
import './apiUrl-8UAdR0AJ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "crearCooperador",
  __ssrInlineRender: true,
  setup(__props) {
    useAdminCooperadorStore();
    const formDataToSend = ref({
      tipoCedula: "Tipo cedula",
      cedula: "",
      nombre: "",
      ubicacion: "",
      tipo: "Tipo Colaborador",
      categoria: []
    });
    function asignarCategoria(data) {
      formDataToSend.value.categoria = data;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalAutoClose = _sfc_main$2;
      const _component_AdminCooperadorSearch = _sfc_main$3;
      _push(`<!--[--><form class="max-w-2xl flex flex-col gap-2 mx-auto" action=""><p class="text-primary-content bg-primary rounded-box text-center font-bold">CREAR COOPERADOR</p><div class="flex flex-col items-center"><select class="select w-full select-bordered text-base text-primary"><option class="" disabled selected>Tipo cedula</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(formDataToSend).tipoCedula) ? ssrLooseContain(unref(formDataToSend).tipoCedula, null) : ssrLooseEqual(unref(formDataToSend).tipoCedula, null)) ? " selected" : ""}>J</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(formDataToSend).tipoCedula) ? ssrLooseContain(unref(formDataToSend).tipoCedula, null) : ssrLooseEqual(unref(formDataToSend).tipoCedula, null)) ? " selected" : ""}>V</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(formDataToSend).tipoCedula) ? ssrLooseContain(unref(formDataToSend).tipoCedula, null) : ssrLooseEqual(unref(formDataToSend).tipoCedula, null)) ? " selected" : ""}>E</option></select><span class="badge badge-info">Optional</span></div><div class="flex flex-col items-center"><label class="input w-full input-bordered flex items-center gap-2 grow"><div class="text-primary">Cedula</div><input${ssrRenderAttr("value", unref(formDataToSend).cedula)} type="number" class="grow" placeholder="Inserte Cedula"></label></div><div class="flex flex-col items-center"><label class="input w-full input-bordered flex items-center gap-2"><div class="text-primary">Nombre</div><input${ssrRenderAttr("value", unref(formDataToSend).nombre)} type="text" class="grow" placeholder="Nombre cooperador"></label></div><div class="flex flex-col items-center"><label class="input w-full input-bordered flex items-center gap-1"><div class="text-primary">Ubicaci\xF3n </div><input${ssrRenderAttr("value", unref(formDataToSend).ubicacion)} type="text" class="grow" placeholder="Ubicaci\xF3n cooperador"></label><span class="badge badge-info">Optional</span></div><select class="select select-bordered text-base text-primary"><option class="" disabled selected>Tipo Colaborador</option><option selected value="C">colaborador</option><option value="P"${ssrIncludeBooleanAttr(Array.isArray(unref(formDataToSend).tipo) ? ssrLooseContain(unref(formDataToSend).tipo, "P") : ssrLooseEqual(unref(formDataToSend).tipo, "P")) ? " selected" : ""}>patrocinador</option></select><div class="flex flex-col">`);
      _push(ssrRenderComponent(_component_ModalAutoClose, {
        "modal-titulo": `Relacionar con una categoria`,
        "modal-id": `agregarCategoria`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              "modo-seleccion": "",
              onSelectedCategorias: asignarCategoria
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                "modo-seleccion": "",
                onSelectedCategorias: asignarCategoria
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="badge badge-info mx-auto">Optional</span></div><button class="btn btn-sm btn-accent grow"> agregar</button></form>`);
      _push(ssrRenderComponent(_component_AdminCooperadorSearch, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/cooperador/crearCooperador.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=crearCooperador-Do5mvCcB.mjs.map
