import { _ as _sfc_main$1, a as _sfc_main$1$1 } from './subirImagen-BP_AO5Pw.mjs';
import { _ as _sfc_main$3 } from './search-KgFQMuu_.mjs';
import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import _sfc_main$4 from './Icon-CIuK0Lje.mjs';
import { u as useAdminPostStore } from './crearPost-F7xKsIUQ.mjs';
import { defineComponent, ref, watch, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, toDisplayString, withDirectives, vModelText, unref, useSSRContext } from 'vue';
import { ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import _sfc_main$2 from './crearCategoria-BJ9s_51C.mjs';
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
import './composables-TtYWI-F6.mjs';
import './apiUrl-8UAdR0AJ.mjs';
import '@canopassoftware/vue-file-upload';
import '@morev/vue-transitions';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './IconTw-CfM8SxUn.mjs';
import './IconSvg-CeYqyohg.mjs';
import './autoClose-Dy4s4znN.mjs';
import './categoria-Bxh7Nsxw.mjs';
import './fetch-B0jF0AGP.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "editar",
  __ssrInlineRender: true,
  props: {
    objectData: {
      type: Object
    }
  },
  setup(__props) {
    useAdminPostStore();
    const props = __props;
    function asignarCategoria(valor) {
      dataToSend.value.categoria = valor;
    }
    function asignarCooperador(valor) {
      dataToSend.value.cooperador = valor;
    }
    function asignarImagen(valor) {
      dataToSend.value.filesPost = valor;
    }
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
    watch(() => {
      var _a;
      return (_a = props.objectData) == null ? void 0 : _a.id;
    }, () => {
      asignacionDataToSend();
    });
    watch(() => {
      var _a;
      return (_a = props.objectData) == null ? void 0 : _a.files;
    }, () => {
      var _a;
      dataToSend.value.filesPost = (_a = props.objectData) == null ? void 0 : _a.files.map((file) => file.id);
    });
    function asignacionDataToSend() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      console.log((_a = props.objectData) == null ? void 0 : _a.summary);
      dataToSend.value.authorID = (_b = props.objectData) == null ? void 0 : _b.authorID;
      dataToSend.value.title = (_c = props.objectData) == null ? void 0 : _c.title;
      dataToSend.value.content = (_d = props.objectData) == null ? void 0 : _d.content;
      dataToSend.value.summary = (_e = props.objectData) == null ? void 0 : _e.summary;
      dataToSend.value.published = (_f = props.objectData) == null ? void 0 : _f.published;
      dataToSend.value.cooperador = (_g = props.objectData) == null ? void 0 : _g.cooperador.map((cop) => cop.id);
      dataToSend.value.categoria = (_h = props.objectData) == null ? void 0 : _h.categoria.map((cat) => cat.id);
      dataToSend.value.template = (_i = props.objectData) == null ? void 0 : _i.template;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalAutoClosedAdmin = _sfc_main$1$1;
      const _component_AdminCooperadorSearch = _sfc_main$3;
      const _component_TransitionFade = __nuxt_component_2;
      const _component_Icon = _sfc_main$4;
      _push(`<!--[-->`);
      if (props.objectData) {
        _push(`<div><form><div class="max-w-md flex flex-col gap-2 mx-auto"><div class="form-control w-52 mx-auto"><label class="label cursor-pointer"><span class="label-text">Publicado</span><input${ssrIncludeBooleanAttr(Array.isArray(props.objectData.published) ? ssrLooseContain(props.objectData.published, null) : props.objectData.published) ? " checked" : ""} type="checkbox" class="toggle toggle-accent"></label></div><label class="input input-bordered flex items-center gap-2"><div class="text-primary">Titulo</div><input${ssrRenderAttr("value", props.objectData.title)} type="text" class="grow" placeholder="Inserte titulo"></label><select class="select select-bordered text-base text-primary"><option class="" disabled selected>Plantilla</option><option>1</option><option>2</option><option>3</option><option>4</option></select><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Imagenes externas </div>`);
        _push(ssrRenderComponent(_component_ModalAutoClosedAdmin, {
          "modal-titulo": `Seleccionar`,
          "modal-id": `Seleccionar-Imagenes-Externas-${props.objectData.id}`
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
        _push(ssrRenderComponent(_component_ModalAutoClosedAdmin, {
          "modal-titulo": `Seleccionar`,
          "modal-id": `Seleccionar-Imagenes-internas-editar-${props.objectData.id}`
        }, {
          contenido: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`<div class="min-h-[70dvh]"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                "id-i-mage": props.objectData.title,
                "modo-seleccion": "",
                "inyeccion-seleccion": (_a = props.objectData) == null ? void 0 : _a.files.map((file) => file.id),
                onSelectedCategorias: asignarImagen
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "min-h-[70dvh]" }, [
                  createVNode(_sfc_main$1, {
                    "id-i-mage": props.objectData.title,
                    "modo-seleccion": "",
                    "inyeccion-seleccion": (_b = props.objectData) == null ? void 0 : _b.files.map((file) => file.id),
                    onSelectedCategorias: asignarImagen
                  }, null, 8, ["id-i-mage", "inyeccion-seleccion"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Categoria </div>`);
        _push(ssrRenderComponent(_component_ModalAutoClosedAdmin, {
          "modal-titulo": `Seleccionar`,
          "modal-id": `Seleccionar-Categoria-${props.objectData.id}`
        }, {
          contenido: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                "modo-seleccion": "",
                "inyeccion-categoria": (_a = props.objectData) == null ? void 0 : _a.categoria.map((unaCategoria) => unaCategoria.id),
                onSelectedCategorias: asignarCategoria
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, {
                  "modo-seleccion": "",
                  "inyeccion-categoria": (_b = props.objectData) == null ? void 0 : _b.categoria.map((unaCategoria) => unaCategoria.id),
                  onSelectedCategorias: asignarCategoria
                }, null, 8, ["inyeccion-categoria"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="border rounded-md pt-2 input-bordered flex flex-col gap-2"><div class="basis-1/3 min-w-min text-primary text-center"> Cooperador </div>`);
        _push(ssrRenderComponent(_component_ModalAutoClosedAdmin, {
          "modal-titulo": `Seleccionar`,
          "modal-id": `Seleccionar-Cooperador-${props.objectData.id}`
        }, {
          contenido: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(ssrRenderComponent(_component_AdminCooperadorSearch, {
                "modo-seleccion": "",
                "inyeccion-cooperador": (_a = props.objectData) == null ? void 0 : _a.cooperador.map((unCooperador) => unCooperador.id),
                onSelectedCategorias: asignarCooperador
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_AdminCooperadorSearch, {
                  "modo-seleccion": "",
                  "inyeccion-cooperador": (_b = props.objectData) == null ? void 0 : _b.cooperador.map((unCooperador) => unCooperador.id),
                  onSelectedCategorias: asignarCooperador
                }, null, 8, ["inyeccion-cooperador"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="flex flex-col items-center"><h3 class="text-2xl text-center">Resumen</h3><textarea placeholder="Resumen" class="textarea textarea-bordered textarea-sm w-full max-w-6xl">${ssrInterpolate(props.objectData.summary)}</textarea><h3 class="text-2xl text-center">Contendio principal</h3>`);
        _push(ssrRenderComponent(_component_TransitionFade, {
          group: "",
          class: "flex flex-col w-full items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(props.objectData.content, (parrafo, index) => {
                _push2(`<div class="flex flex-col relative w-full max-w-6xl"${_scopeId}>`);
                if (index !== 0) {
                  _push2(ssrRenderComponent(_component_Icon, {
                    onClick: ($event) => props.objectData.content.splice(index, 1),
                    class: "btn btn-xs btn-circle absolute top-4 right-0 text-red-300 hover:text-red-500 hover:cursor-pointer",
                    size: "10",
                    name: "fa:close"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span${_scopeId}> parrafo N\xB0 ${ssrInterpolate(index + 1)}</span><textarea rows="1" placeholder="contendio principal" class="textarea leading-5 textarea-bordered textarea-sm w-full"${_scopeId}>${ssrInterpolate(props.objectData.content[index])}</textarea></div>`);
              });
              _push2(`<!--]--><div class="btn btn-circle mx-auto group"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                class: "text-accent group-hover:text-green-600",
                size: "20",
                name: "fa:plus"
              }, null, _parent2, _scopeId));
              _push2(`</div><button class="btn btn-accent"${_scopeId}>EDITAR Post</button>`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(props.objectData.content, (parrafo, index) => {
                  return openBlock(), createBlock("div", {
                    class: "flex flex-col relative w-full max-w-6xl",
                    key: index
                  }, [
                    index !== 0 ? (openBlock(), createBlock(_component_Icon, {
                      key: 0,
                      onClick: withModifiers(($event) => props.objectData.content.splice(index, 1), ["stop"]),
                      class: "btn btn-xs btn-circle absolute top-4 right-0 text-red-300 hover:text-red-500 hover:cursor-pointer",
                      size: "10",
                      name: "fa:close"
                    }, null, 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode("span", null, " parrafo N\xB0 " + toDisplayString(index + 1), 1),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => props.objectData.content[index] = $event,
                      rows: "1",
                      placeholder: "contendio principal",
                      class: "textarea leading-5 textarea-bordered textarea-sm w-full"
                    }, "\r\n          ", 8, ["onUpdate:modelValue"]), [
                      [vModelText, props.objectData.content[index]]
                    ])
                  ]);
                }), 128)),
                createVNode("div", {
                  onClick: ($event) => props.objectData.content.push(""),
                  class: "btn btn-circle mx-auto group"
                }, [
                  createVNode(_component_Icon, {
                    class: "text-accent group-hover:text-green-600",
                    size: "20",
                    name: "fa:plus"
                  })
                ], 8, ["onClick"]),
                createVNode("button", { class: "btn btn-accent" }, "EDITAR Post")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<pre class="text-success">    ${ssrInterpolate(unref(dataToSend))}
  </pre><hr><pre class="text-warning"> 
    
    ${ssrInterpolate(props.objectData)}
  </pre><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/post/editar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=editar-MRcZd_0f.mjs.map
