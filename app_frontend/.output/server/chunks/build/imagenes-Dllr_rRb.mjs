import { defineAsyncComponent, defineComponent, ref, watch, resolveDirective, unref, withCtx, createVNode, mergeProps, openBlock, createBlock, Fragment, renderList, withDirectives, createCommentVNode, useSSRContext } from 'vue';
import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import { d as defineStore } from './server.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './subirImagen-BP_AO5Pw.mjs';
import '@morev/vue-transitions';
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
import './Icon-CIuK0Lje.mjs';
import './IconTw-CfM8SxUn.mjs';
import './IconSvg-CeYqyohg.mjs';
import '@canopassoftware/vue-file-upload';

const useCarruselStore = defineStore("CarruselStore", {
  state: () => ({
    DB_carrusel: [],
    toasts: {
      succes: 0,
      info: 0,
      error: 0
    },
    count_reload: 0
  }),
  getters: {},
  actions: {
    async optenerCarruselImages() {
      const { user, loggedIn, token } = await useJwtAuth();
      const response = await $fetch(`${APIURL}/images/carrusel`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json"
        }
      });
      this.DB_carrusel = response;
    },
    async actualizarImagenesCarrusel({ dataToSend }) {
      const { user, loggedIn, token } = await useJwtAuth();
      console.log(dataToSend);
      try {
        const response = await $fetch(`${APIURL}/images/carrusel`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        });
        this.toasts.succes++;
        this.count_reload++;
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerImagenes(id) {
      const data = await (await fetch(`${APIURL}/post/files/${id}`)).json();
      return data;
    }
  }
});
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./basic-HvB3RpG4.mjs').then((c) => c.default || c));
const __nuxt_component_1_lazy = defineAsyncComponent(() => import('./autoClose-Dy4s4znN.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "imagenes",
  __ssrInlineRender: true,
  setup(__props) {
    const storeCarrusel = useCarruselStore();
    const idImages = ref([]);
    function asignarImagenes(data) {
      console.log(data);
      idImages.value = data;
    }
    watch(() => storeCarrusel.count_reload, (newValue, oldValue) => {
      storeCarrusel.optenerCarruselImages();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyToastBasic = __nuxt_component_0_lazy;
      const _component_LazyModalAutoClose = __nuxt_component_1_lazy;
      const _component_TransitionFade = __nuxt_component_2;
      const _directive_lazy_load = resolveDirective("lazy-load");
      let _temp0, _temp1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_LazyToastBasic, {
        tipo: "alert-success",
        active_count: unref(storeCarrusel).toasts.succes,
        text: "carrusel actualizado con exito"
      }, null, _parent));
      _push(`<div class="my-10 flex justify-center">`);
      _push(ssrRenderComponent(_component_LazyModalAutoClose, {
        "modal-id": "deleccion-imagen-carrusel",
        "modal-titulo": "Seleccionar imagenes para el carrusel"
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              class: "min-h-[50vh]",
              "modo-seleccion": "",
              onSelectedCategorias: asignarImagenes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                class: "min-h-[50vh]",
                "modo-seleccion": "",
                onSelectedCategorias: asignarImagenes
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col items-center"><div class="text-4xl text-center mb-1">Imagenes seleccionadas para colocar en el carrusel</div>`);
      _push(ssrRenderComponent(_component_TransitionFade, {
        group: "",
        class: "flex flex-wrap justify-center gap-1 mb-4 border rounded-lg min-h-40 w-full p-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(idImages), (id) => {
              var _a;
              _push2(`<div class="group w-52 h-52 bg-base-300 shadow-md hover:shadow-primary rounded-md overflow-hidden"${_scopeId}><img v-lazy-load ${ssrRenderAttrs(_temp0 = mergeProps({
                class: "object-cover w-full h-full",
                "data-src": `${unref(APIURL)}/post/files/${id}`,
                alt: "car!"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(idImages), (id) => {
                return openBlock(), createBlock("div", {
                  class: "group w-52 h-52 bg-base-300 shadow-md hover:shadow-primary rounded-md overflow-hidden",
                  key: id
                }, [
                  withDirectives(createVNode("img", {
                    class: "object-cover w-full h-full",
                    "data-src": `${unref(APIURL)}/post/files/${id}`,
                    alt: "car!"
                  }, null, 8, ["data-src"]), [
                    [_directive_lazy_load]
                  ])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn btn-primary mx-auto">Actualizar</button></div><div class="flex flex-col items-center"><div class="text-4xl text-center mb-1">Imagenes actualmente en el carrusel</div>`);
      _push(ssrRenderComponent(_component_TransitionFade, {
        group: "",
        class: "flex flex-wrap justify-center gap-1 mb-4 border rounded-lg min-h-40 w-full p-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(storeCarrusel).DB_carrusel.length < 1) {
              _push2(`<div class="text-4xl text-center"${_scopeId}>Carrusel Sin imagenes</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(storeCarrusel).DB_carrusel, (id) => {
              var _a;
              _push2(`<div class="group w-52 h-52 bg-base-300 shadow-md hover:shadow-primary rounded-md overflow-hidden"${_scopeId}><img v-lazy-load ${ssrRenderAttrs(_temp1 = mergeProps({
                class: "object-cover w-full h-full",
                "data-src": `${unref(APIURL)}/post/files/${id.id}`,
                alt: "imagen carrusel"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId}>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : (_a = _temp1.innerHTML) != null ? _a : ""}</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              unref(storeCarrusel).DB_carrusel.length < 1 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-4xl text-center"
              }, "Carrusel Sin imagenes")) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(storeCarrusel).DB_carrusel, (id) => {
                return openBlock(), createBlock("div", {
                  class: "group w-52 h-52 bg-base-300 shadow-md hover:shadow-primary rounded-md overflow-hidden",
                  key: id.id
                }, [
                  withDirectives(createVNode("img", {
                    class: "object-cover w-full h-full",
                    "data-src": `${unref(APIURL)}/post/files/${id.id}`,
                    alt: "imagen carrusel"
                  }, null, 8, ["data-src"]), [
                    [_directive_lazy_load]
                  ])
                ]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/carrusel/imagenes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=imagenes-Dllr_rRb.mjs.map
