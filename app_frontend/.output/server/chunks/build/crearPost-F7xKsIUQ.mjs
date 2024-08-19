import _sfc_main$3 from './autoClose-Dy4s4znN.mjs';
import { _ as _sfc_main$4 } from './search-KgFQMuu_.mjs';
import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import _sfc_main$5 from './Icon-CIuK0Lje.mjs';
import { _ as _sfc_main$6 } from './categoria-Bxh7Nsxw.mjs';
import { defineAsyncComponent, useSSRContext, defineComponent, withAsyncContext, ref, watch, resolveDirective, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, toDisplayString, withDirectives, vModelText, mergeProps, vModelCheckbox } from 'vue';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { d as defineStore } from './server.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import { u as useFetch } from './fetch-B0jF0AGP.mjs';
import { ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrGetDirectiveProps } from 'vue/server-renderer';
import _sfc_main$2 from './crearCategoria-BJ9s_51C.mjs';
import { _ as _sfc_main$1 } from './subirImagen-BP_AO5Pw.mjs';
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
import '@canopassoftware/vue-file-upload';

const useAdminPostStore = defineStore("AdminPostStore", {
  state: () => ({
    count_reload: 0,
    actualizacion_exitosa: 0
  }),
  getters: {},
  actions: {
    async CreatePost({ dataToSend }) {
      const { user, loggedIn, token } = await useJwtAuth();
      const response = await $fetch(`${APIURL}/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: JSON.stringify(dataToSend)
      });
      this.count_reload++;
      return response;
    },
    async GetPost({ dataToSend = "" }) {
      const { token } = await useJwtAuth();
      const response = await $fetch(`${APIURL}/post${`/?token=${token.value}`}`, {
        method: "GET",
        query: {
          categoria: dataToSend
        }
      });
      console.log(response);
      return response;
    },
    async ActualizarPost({ dataToSend, id }) {
      console.log("dataToSend", dataToSend);
      try {
        const { user, loggedIn, token } = await useJwtAuth();
        const response = await $fetch(`${APIURL}/post/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.value}`
          },
          body: dataToSend
        });
        this.count_reload++;
        this.actualizacion_exitosa++;
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async cambiarEstadoPost({ id, estadoActual }) {
      const { token } = await useJwtAuth();
      try {
        const response = await $fetch(`${APIURL}/post/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json"
          },
          body: {
            published: estadoActual
          }
        });
        this.count_reload++;
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    async eliminarPost({ id }) {
      const confirmDelete = confirm("desea Eliminar este post");
      if (!confirmDelete)
        return;
      const { token } = await useJwtAuth();
      try {
        const response = await $fetch(`${APIURL}/post/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json"
          }
        });
        this.count_reload++;
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./autoClose-Dy4s4znN.mjs').then((c) => c.default || c));
const __nuxt_component_5_lazy = defineAsyncComponent(() => import('./editar-MRcZd_0f.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "crearPost",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => useJwtAuth()), __temp = await __temp, __restore();
    const storePost = useAdminPostStore();
    const parrafosContent = ref(
      [""]
    );
    const dataToSend = ref({
      title: "",
      content: [""],
      summary: "",
      published: false,
      images: [],
      template: 1,
      authorID: 0,
      filesPost: [],
      cooperador: [],
      categoria: []
    });
    const DB_dataPost = ref(null);
    async function component_getPost({ categoria = "" }) {
      DB_dataPost.value = await storePost.GetPost({ dataToSend: categoria });
    }
    const queryCategoria = ref(void 0);
    const selectCategoria = (categoriaName) => {
      queryCategoria.value = categoriaName;
    };
    const { data: dataCategorias } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${APIURL}/categorias`, "$5DOn8SFUuM")), __temp = await __temp, __restore(), __temp);
    function asignarCategoria(valor) {
      dataToSend.value.categoria = valor;
    }
    function asignarCooperador(valor) {
      dataToSend.value.cooperador = valor;
    }
    function asignarImagen(valor) {
      dataToSend.value.filesPost = valor;
    }
    watch(queryCategoria, async (newCategoria) => {
      await component_getPost({ categoria: queryCategoria.value });
    });
    watch(() => storePost.count_reload, () => {
      component_getPost({ categoria: queryCategoria.value });
    });
    const modalEditar = ref();
    const dataSinglePost = ref();
    function abrirModal({ postData }) {
      var _a, _b;
      (_b = (_a = modalEditar.value) == null ? void 0 : _a.boton) == null ? void 0 : _b.click();
      dataSinglePost.value = postData;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalAutoClose = _sfc_main$3;
      const _component_AdminCooperadorSearch = _sfc_main$4;
      const _component_TransitionFade = __nuxt_component_2;
      const _component_Icon = _sfc_main$5;
      const _component_CardCategoria = _sfc_main$6;
      const _component_LazyModalAutoClose = __nuxt_component_0_lazy;
      const _component_LazyAdminPostEditar = __nuxt_component_5_lazy;
      const _directive_lazy_load = resolveDirective("lazy-load");
      let _temp0;
      _push(`<!--[--><form><div class="max-w-md flex flex-col gap-2 mx-auto"><div class="form-control w-52 mx-auto"><label class="label cursor-pointer"><span class="label-text">Publicado</span><input${ssrIncludeBooleanAttr(Array.isArray(unref(dataToSend).published) ? ssrLooseContain(unref(dataToSend).published, null) : unref(dataToSend).published) ? " checked" : ""} type="checkbox" class="toggle toggle-accent"></label></div><label class="input input-bordered flex items-center gap-2"><div class="text-primary">Titulo</div><input${ssrRenderAttr("value", unref(dataToSend).title)} type="text" class="grow" placeholder="Inserte titulo"></label><select class="select select-bordered text-base text-primary"><option class="" disabled selected>Plantilla</option><option>1</option><option>2</option><option>3</option><option>4</option></select><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Imagenes externas </div>`);
      _push(ssrRenderComponent(_component_ModalAutoClose, {
        "modal-titulo": `Seleccionar`,
        "modal-id": `Seleccionar-Imagenes-Externas`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` sdsd `);
          } else {
            return [
              createTextVNode(" sdsd ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Imagenes internas </div>`);
      _push(ssrRenderComponent(_component_ModalAutoClose, {
        "modal-titulo": `Seleccionar`,
        "modal-id": `Seleccionar-Imagenes-internas`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-[70dvh]"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              "modo-seleccion": "",
              onSelectedCategorias: asignarImagen
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-[70dvh]" }, [
                createVNode(_sfc_main$1, {
                  "modo-seleccion": "",
                  onSelectedCategorias: asignarImagen
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Categoria </div>`);
      _push(ssrRenderComponent(_component_ModalAutoClose, {
        "modal-titulo": `Seleccionar`,
        "modal-id": `Seleccionar-Categoria`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              onSelectedCategorias: asignarCategoria,
              "modo-seleccion": ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                onSelectedCategorias: asignarCategoria,
                "modo-seleccion": ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Cooperador </div>`);
      _push(ssrRenderComponent(_component_ModalAutoClose, {
        "modal-titulo": `Seleccionar`,
        "modal-id": `Seleccionar-Cooperador`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AdminCooperadorSearch, {
              "modo-seleccion": "",
              onSelectedCategorias: asignarCooperador
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AdminCooperadorSearch, {
                "modo-seleccion": "",
                onSelectedCategorias: asignarCooperador
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex flex-col items-center"><h3 class="text-2xl text-center">Resumen</h3><textarea placeholder="Resumen" class="textarea textarea-bordered textarea-sm w-full max-w-6xl">${ssrInterpolate(unref(dataToSend).summary)}</textarea><h3 class="text-2xl text-center">Contendio principal</h3>`);
      _push(ssrRenderComponent(_component_TransitionFade, {
        group: "",
        class: "flex flex-col w-full items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(parrafosContent), (parrafo, index) => {
              _push2(`<div class="flex flex-col relative w-full max-w-6xl"${_scopeId}>`);
              if (index !== 0) {
                _push2(ssrRenderComponent(_component_Icon, {
                  onClick: ($event) => unref(parrafosContent).splice(index, 1),
                  class: "btn btn-xs btn-circle absolute top-4 right-0 text-red-300 hover:text-red-500 hover:cursor-pointer",
                  size: "10",
                  name: "fa:close"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span${_scopeId}> parrafo N\xB0 ${ssrInterpolate(index + 1)}</span><textarea rows="1" placeholder="contendio principal" class="textarea leading-5 textarea-bordered textarea-sm w-full"${_scopeId}>${ssrInterpolate(unref(parrafosContent)[index])}</textarea></div>`);
            });
            _push2(`<!--]--><div class="btn btn-circle mx-auto group"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              class: "text-accent group-hover:text-green-600",
              size: "20",
              name: "fa:plus"
            }, null, _parent2, _scopeId));
            _push2(`</div><button class="btn btn-accent"${_scopeId}>Crear Post</button>`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(parrafosContent), (parrafo, index) => {
                return openBlock(), createBlock("div", {
                  class: "flex flex-col relative w-full max-w-6xl",
                  key: index
                }, [
                  index !== 0 ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    onClick: withModifiers(($event) => unref(parrafosContent).splice(index, 1), ["stop"]),
                    class: "btn btn-xs btn-circle absolute top-4 right-0 text-red-300 hover:text-red-500 hover:cursor-pointer",
                    size: "10",
                    name: "fa:close"
                  }, null, 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode("span", null, " parrafo N\xB0 " + toDisplayString(index + 1), 1),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => unref(parrafosContent)[index] = $event,
                    rows: "1",
                    placeholder: "contendio principal",
                    class: "textarea leading-5 textarea-bordered textarea-sm w-full"
                  }, "\r\n          ", 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(parrafosContent)[index]]
                  ])
                ]);
              }), 128)),
              createVNode("div", {
                onClick: ($event) => unref(parrafosContent).push(""),
                class: "btn btn-circle mx-auto group"
              }, [
                createVNode(_component_Icon, {
                  class: "text-accent group-hover:text-green-600",
                  size: "20",
                  name: "fa:plus"
                })
              ], 8, ["onClick"]),
              createVNode("button", { class: "btn btn-accent" }, "Crear Post")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form><div><label class="input input-bordered flex items-center my-2"><input type="text" class="grow" placeholder="Search">`);
      _push(ssrRenderComponent(_component_Icon, { name: "ic:baseline-search" }, null, _parent));
      _push(`</label><hr><div class="flex flex-wrap gap-2 justify-center my-12">`);
      _push(ssrRenderComponent(_component_CardCategoria, {
        class: { "border-primary shadow-md shadow-blue-500": unref(queryCategoria) === "" },
        onClick: ($event) => selectCategoria(""),
        content: "todos"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(dataCategorias), (categoria) => {
        _push(ssrRenderComponent(_component_CardCategoria, {
          class: { "border-primary shadow-md shadow-blue-500": unref(queryCategoria) === categoria.name },
          onClick: ($event) => selectCategoria(categoria.name),
          content: categoria.name
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_TransitionFade, {
        group: "",
        class: "flex flex-wrap justify-around gap-1 my-4 min-h-[293px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(DB_dataPost), (post, index) => {
              var _a;
              _push2(`<div class="group h-96 card glass basis-[230px] bg-base-300 shadow-md hover:shadow-primary"${_scopeId}><button class="btn btn-sm btn-circle absolute right-0 hover:text-red-600"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, { name: "material-symbols:delete" }, null, _parent2, _scopeId));
              _push2(`</button><figure class="h-[50%]"${_scopeId}><img v-lazy-load ${ssrRenderAttrs(_temp0 = mergeProps({
                class: "w-full h-full object-contain",
                "data-src": post.images[0],
                alt: "car!"
              }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</figure><div class="card-body p-2"${_scopeId}><h2 class="card-title text-center mx-auto"${_scopeId}>${ssrInterpolate(post.title)}</h2><p class="leading-4"${_scopeId}>${ssrInterpolate(post.summary)}</p><hr${_scopeId}><div class="flex flex-col gap-2"${_scopeId}><label class="text-center"${_scopeId}>${ssrInterpolate(post.published ? "Activado" : "Desactivado")}</label><input${ssrIncludeBooleanAttr(Array.isArray(post.published) ? ssrLooseContain(post.published, null) : post.published) ? " checked" : ""} type="checkbox" class="toggle toggle-accent mx-auto"${_scopeId}><button class="btn btn-primary"${_scopeId}>EDITAR</button></div></div></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(DB_dataPost), (post, index) => {
                return openBlock(), createBlock("div", { class: "group h-96 card glass basis-[230px] bg-base-300 shadow-md hover:shadow-primary" }, [
                  createVNode("button", {
                    onClick: ($event) => unref(storePost).eliminarPost({ id: post.id }),
                    class: "btn btn-sm btn-circle absolute right-0 hover:text-red-600"
                  }, [
                    createVNode(_component_Icon, { name: "material-symbols:delete" })
                  ], 8, ["onClick"]),
                  createVNode("figure", { class: "h-[50%]" }, [
                    withDirectives(createVNode("img", {
                      class: "w-full h-full object-contain",
                      "data-src": post.images[0],
                      alt: "car!"
                    }, null, 8, ["data-src"]), [
                      [_directive_lazy_load]
                    ])
                  ]),
                  createVNode("div", { class: "card-body p-2" }, [
                    createVNode("h2", { class: "card-title text-center mx-auto" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "leading-4" }, toDisplayString(post.summary), 1),
                    createVNode("hr"),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode("label", { class: "text-center" }, toDisplayString(post.published ? "Activado" : "Desactivado"), 1),
                      withDirectives(createVNode("input", {
                        onChange: ($event) => unref(storePost).cambiarEstadoPost({ id: post.id, estadoActual: post.published }),
                        "onUpdate:modelValue": ($event) => post.published = $event,
                        type: "checkbox",
                        class: "toggle toggle-accent mx-auto"
                      }, null, 40, ["onChange", "onUpdate:modelValue"]), [
                        [vModelCheckbox, post.published]
                      ]),
                      createVNode("button", {
                        onClick: ($event) => abrirModal({ postData: post }),
                        class: "btn btn-primary"
                      }, "EDITAR", 8, ["onClick"])
                    ])
                  ])
                ]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_LazyModalAutoClose, {
        ref_key: "modalEditar",
        ref: modalEditar,
        hidden: "",
        "modal-titulo": "EDITAR",
        "modal-id": `modalEditar-boton`
      }, {
        contenido: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LazyAdminPostEditar, { "object-data": unref(dataSinglePost) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LazyAdminPostEditar, { "object-data": unref(dataSinglePost) }, null, 8, ["object-data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/post/crearPost.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const crearPost = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  default: _sfc_main
});

export { crearPost as c, useAdminPostStore as u };
//# sourceMappingURL=crearPost-F7xKsIUQ.mjs.map
