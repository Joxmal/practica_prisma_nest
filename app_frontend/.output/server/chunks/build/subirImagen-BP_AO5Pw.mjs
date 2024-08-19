import { defineComponent, ref, watch, unref, useSSRContext, resolveDirective, mergeProps, withCtx, createVNode, openBlock, createBlock, createTextVNode, withDirectives, toDisplayString, Fragment, renderList, withModifiers, createCommentVNode } from 'vue';
import { ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot, ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderList } from 'vue/server-renderer';
import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import _sfc_main$2 from './Icon-CIuK0Lje.mjs';
import { d as defineStore } from './server.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import { MultipleFileUpload } from '@canopassoftware/vue-file-upload';
import '@morev/vue-transitions';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './IconTw-CfM8SxUn.mjs';
import './IconSvg-CeYqyohg.mjs';
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
  __name: "autoClosedAdmin",
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
      _push(`<div class="modal-action"></div></div><label class="modal-backdrop"${ssrRenderAttr("for", props.modalId)}>Close</label></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/modal/autoClosedAdmin.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useImagenStore = defineStore("ImagenStore", {
  state: () => ({
    contador_reload: 0,
    nombreGrupoImagen: ""
  }),
  getters: {},
  actions: {
    async handleMultipleFileUpload(files) {
      console.log(files);
      await new Promise((resolve) => {
        console.log(resolve);
        this.enviarArchivosAlBackend(files, this.nombreGrupoImagen);
        this.contador_reload++;
        setTimeout(resolve, 2e3);
      });
    },
    async enviarArchivosAlBackend(archivos, nombreGrupoImagen) {
      const { user, loggedIn, token } = await useJwtAuth();
      const formData = new FormData();
      archivos.forEach((archivo) => {
        formData.append("file", archivo);
      });
      formData.append("name", nombreGrupoImagen);
      try {
        const response = await fetch(`${APIURL}/post/files`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token.value}`
          },
          body: formData
        });
        const data = await response.json();
        console.log("data", data);
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerImagenes() {
      const data = await (await fetch(`${APIURL}/post/filesAll/all`)).json();
      return data;
    },
    async eliminarImagen({ id }) {
      const { user, loggedIn, token } = await useJwtAuth();
      try {
        const response = await fetch(`${APIURL}/post/files/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token.value}`
          }
        });
        return response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "subirImagen",
  __ssrInlineRender: true,
  props: {
    modoSeleccion: {
      type: Boolean,
      default: false
    },
    idIMage: {
      type: String,
      default: "zero"
    },
    inyeccionSeleccion: {
      type: Array
    }
  },
  emits: ["selectedCategorias"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const store = useImagenStore();
    const uploadedFiles = ref([]);
    const nombregrupoImagenes = ref(null);
    async function component_obtenerImagenes() {
      nombregrupoImagenes.value = await store.obtenerImagenes();
    }
    async function component_eliminarImagen(id) {
      await store.eliminarImagen({ id });
      component_obtenerImagenes();
    }
    watch(() => store.contador_reload, () => {
      setTimeout(() => {
        component_obtenerImagenes();
      }, 1e3);
    });
    watch(() => props.inyeccionSeleccion, () => {
      var _a, _b;
      if (props.inyeccionSeleccion && ((_a = props.inyeccionSeleccion) == null ? void 0 : _a.length) <= 0) {
        console.log(props.inyeccionSeleccion);
        selectedCategories.value = props.inyeccionSeleccion;
      }
      if (props.inyeccionSeleccion && ((_b = props.inyeccionSeleccion) == null ? void 0 : _b.length) > 0) {
        console.log(props.inyeccionSeleccion);
        selectedCategories.value = props.inyeccionSeleccion;
      }
    });
    const selectedCategories = ref([]);
    const toggleCategorySelection = (categoriaId) => {
      if (!props.modoSeleccion)
        return;
      const index = selectedCategories.value.indexOf(categoriaId);
      if (index === -1) {
        selectedCategories.value.push(categoriaId);
      } else {
        selectedCategories.value.splice(index, 1);
      }
      emit("selectedCategorias", selectedCategories.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalAutoClosedAdmin = _sfc_main$1;
      const _component_TransitionFade = __nuxt_component_2;
      const _component_Icon = _sfc_main$2;
      const _directive_lazy_load = resolveDirective("lazy-load");
      let _temp0, _temp1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center gap-1" }, _attrs))}>`);
      if (!props.modoSeleccion) {
        _push(`<input${ssrRenderAttr("value", unref(store).nombreGrupoImagen)} type="text" placeholder="nombre de grupo de imagenes" class="input input-primary w-full max-w-xs">`);
      } else {
        _push(`<!---->`);
      }
      if (!props.modoSeleccion) {
        _push(`<div class="grid relative gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 overflow-auto max-h-[500px] border-2 border-primary p-2">`);
        _push(ssrRenderComponent(unref(MultipleFileUpload), {
          removeBtnText: "x",
          uploadedFiles: unref(uploadedFiles),
          uploadBtnText: "Save",
          progressBtnText: "Saving...",
          callback: unref(store).handleMultipleFileUpload
        }, {
          default: withCtx((file, _push2, _parent2, _scopeId) => {
            var _a;
            if (_push2) {
              _push2(`<div class="flex flex-col w-full text-center mx-auto"${_scopeId}><div class="flex w-full items-center justify-center"${_scopeId}>`);
              if (!file.file) {
                _push2(`<label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"${_scopeId}><div class="flex flex-col items-center justify-center pt-5 pb-6 px-10"${_scopeId}><svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"${_scopeId}></path></svg><p class="mb-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}><span class="font-semibold"${_scopeId}>Click para subir</span> oo arrastra la imagen </p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>SVG, PNG o JPG</p></div></label>`);
              } else {
                _push2(`<div${_scopeId}><div class="h-52 w-full"${_scopeId}>`);
                if (file.file.previewType != "video") {
                  _push2(`<img v-lazy-load ${ssrRenderAttrs(_temp0 = mergeProps({
                    class: "h-full w-full object-cover rounded-2xl",
                    "data-src": file.file.previewUrl
                  }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}`);
                } else {
                  _push2(`<video v-lazy-load ${ssrRenderAttrs(mergeProps({
                    autoplay: "",
                    loop: "",
                    class: "h-full w-full object-contain"
                  }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId}><source${ssrRenderAttr("data-src", file.file.previewUrl)} type="video/mp4"${_scopeId}></video>`);
                }
                _push2(`</div></div>`);
              }
              _push2(`</div><p class="items-center justify-center text-center"${_scopeId}>${ssrInterpolate(file.file ? file.file.previewName : "")}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col w-full text-center mx-auto" }, [
                  createVNode("div", { class: "flex w-full items-center justify-center" }, [
                    !file.file ? (openBlock(), createBlock("label", {
                      key: 0,
                      for: "dropzone-file",
                      class: "flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    }, [
                      createVNode("div", { class: "flex flex-col items-center justify-center pt-5 pb-6 px-10" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 mb-4 text-gray-500 dark:text-gray-400",
                          "aria-hidden": "true",
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 20 16"
                        }, [
                          createVNode("path", {
                            stroke: "currentColor",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          })
                        ])),
                        createVNode("p", { class: "mb-2 text-sm text-gray-500 dark:text-gray-400" }, [
                          createVNode("span", { class: "font-semibold" }, "Click para subir"),
                          createTextVNode(" oo arrastra la imagen ")
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "SVG, PNG o JPG")
                      ])
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "h-52 w-full" }, [
                        file.file.previewType != "video" ? withDirectives((openBlock(), createBlock("img", {
                          key: 0,
                          class: "h-full w-full object-cover rounded-2xl",
                          "data-src": file.file.previewUrl
                        }, null, 8, ["data-src"])), [
                          [_directive_lazy_load]
                        ]) : withDirectives((openBlock(), createBlock("video", {
                          key: 1,
                          autoplay: "",
                          loop: "",
                          class: "h-full w-full object-contain"
                        }, [
                          createVNode("source", {
                            "data-src": file.file.previewUrl,
                            type: "video/mp4"
                          }, null, 8, ["data-src"])
                        ])), [
                          [_directive_lazy_load]
                        ])
                      ])
                    ]))
                  ]),
                  createVNode("p", { class: "items-center justify-center text-center" }, toDisplayString(file.file ? file.file.previewName : ""), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(nombregrupoImagenes)) {
        _push(`<div class="flex flex-wrap justify-center gap-2"><!--[-->`);
        ssrRenderList(unref(nombregrupoImagenes), (grupo, grupoName, index) => {
          _push(ssrRenderComponent(_component_ModalAutoClosedAdmin, {
            key: index,
            "modal-titulo": `${grupoName}`,
            "modal-id": `${grupoName}-${index}-${props.idIMage}`
          }, {
            contenido: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_TransitionFade, {
                  group: "",
                  class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-auto"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(nombregrupoImagenes)[grupoName], (file, name, index2) => {
                        var _a;
                        _push3(`<figure class="${ssrRenderClass([[
                          { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                          { "!border-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                          { "cursor-pointer": props.modoSeleccion }
                        ], "relative w-full h-48 bg-red realative border select-none"])}"${_scopeId2}>`);
                        if (!props.modoSeleccion) {
                          _push3(ssrRenderComponent(_component_Icon, {
                            onClick: ($event) => component_eliminarImagen(unref(nombregrupoImagenes)[grupoName][name].id),
                            class: "absolute z-50 text-red-400 hover:text-red-600 hover:cursor-pointer",
                            size: "30",
                            name: "carbon:close-outline"
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        if (props.modoSeleccion) {
                          _push3(ssrRenderComponent(_component_Icon, {
                            class: ["absolute z-50 hover:cursor-pointer", [
                              { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) }
                            ]],
                            size: "30",
                            color: "red",
                            name: "fa:plus"
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<img v-lazy-load ${ssrRenderAttrs(_temp1 = mergeProps({
                          class: "w-full h-full object-contain",
                          "data-src": unref(nombregrupoImagenes)[grupoName][name].secureUrl,
                          alt: `imagen del grupo ${grupoName}`
                        }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId2}>${"textContent" in _temp1 ? ssrInterpolate(_temp1.textContent) : (_a = _temp1.innerHTML) != null ? _a : ""}</figure>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(nombregrupoImagenes)[grupoName], (file, name, index2) => {
                          return openBlock(), createBlock("figure", {
                            key: unref(nombregrupoImagenes)[grupoName][name].id,
                            onClick: withModifiers(($event) => toggleCategorySelection(unref(nombregrupoImagenes)[grupoName][name].id), ["stop"]),
                            class: [[
                              { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                              { "!border-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                              { "cursor-pointer": props.modoSeleccion }
                            ], "relative w-full h-48 bg-red realative border select-none"]
                          }, [
                            !props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              onClick: ($event) => component_eliminarImagen(unref(nombregrupoImagenes)[grupoName][name].id),
                              class: "absolute z-50 text-red-400 hover:text-red-600 hover:cursor-pointer",
                              size: "30",
                              name: "carbon:close-outline"
                            }, null, 8, ["onClick"])) : createCommentVNode("", true),
                            props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                              key: 1,
                              class: ["absolute z-50 hover:cursor-pointer", [
                                { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) }
                              ]],
                              size: "30",
                              color: "red",
                              name: "fa:plus"
                            }, null, 8, ["class"])) : createCommentVNode("", true),
                            withDirectives(createVNode("img", {
                              class: "w-full h-full object-contain",
                              "data-src": unref(nombregrupoImagenes)[grupoName][name].secureUrl,
                              alt: `imagen del grupo ${grupoName}`
                            }, null, 8, ["data-src", "alt"]), [
                              [_directive_lazy_load]
                            ])
                          ], 10, ["onClick"]);
                        }), 128))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_TransitionFade, {
                    group: "",
                    class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-auto"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(nombregrupoImagenes)[grupoName], (file, name, index2) => {
                        return openBlock(), createBlock("figure", {
                          key: unref(nombregrupoImagenes)[grupoName][name].id,
                          onClick: withModifiers(($event) => toggleCategorySelection(unref(nombregrupoImagenes)[grupoName][name].id), ["stop"]),
                          class: [[
                            { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                            { "!border-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) },
                            { "cursor-pointer": props.modoSeleccion }
                          ], "relative w-full h-48 bg-red realative border select-none"]
                        }, [
                          !props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            onClick: ($event) => component_eliminarImagen(unref(nombregrupoImagenes)[grupoName][name].id),
                            class: "absolute z-50 text-red-400 hover:text-red-600 hover:cursor-pointer",
                            size: "30",
                            name: "carbon:close-outline"
                          }, null, 8, ["onClick"])) : createCommentVNode("", true),
                          props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                            key: 1,
                            class: ["absolute z-50 hover:cursor-pointer", [
                              { "!text-success": unref(selectedCategories).includes(unref(nombregrupoImagenes)[grupoName][name].id) }
                            ]],
                            size: "30",
                            color: "red",
                            name: "fa:plus"
                          }, null, 8, ["class"])) : createCommentVNode("", true),
                          withDirectives(createVNode("img", {
                            class: "w-full h-full object-contain",
                            "data-src": unref(nombregrupoImagenes)[grupoName][name].secureUrl,
                            alt: `imagen del grupo ${grupoName}`
                          }, null, 8, ["data-src", "alt"]), [
                            [_directive_lazy_load]
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/subirImagen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const subirImagen = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _sfc_main
});

export { _sfc_main as _, _sfc_main$1 as a, subirImagen as s };
//# sourceMappingURL=subirImagen-BP_AO5Pw.mjs.map
