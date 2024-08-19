import _sfc_main$1 from './Icon-CIuK0Lje.mjs';
import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import { defineComponent, ref, watch, unref, withCtx, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, withModifiers, createCommentVNode, useSSRContext } from 'vue';
import { d as defineStore } from './server.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import { ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import './IconTw-CfM8SxUn.mjs';
import './IconSvg-CeYqyohg.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@morev/vue-transitions';
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

const useCategoriaStore = defineStore("CrearCategoriaStore", {
  state: () => ({
    count_reaload: 0
  }),
  getters: {},
  actions: {
    async crearCategoria({ dataToSend }) {
      const { user, loggedIn, token } = await useJwtAuth();
      try {
        const response = await $fetch(`${APIURL}/categorias`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        });
        const data = await response;
        console.log(data);
        this.count_reaload++;
        return response;
      } catch (error) {
        if (error) {
          console.error("Error al enviar datos:", error);
        }
      }
    },
    async obtenerCategoria({ dataSearch = "" }) {
      const { user, loggedIn, token } = await useJwtAuth();
      try {
        const response = await $fetch(`${APIURL}/categorias/${dataSearch}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json"
          }
        });
        return response;
      } catch (error) {
        if (error) {
          console.error("Error al enviar datos:", error);
        }
      }
    },
    async EliminarCategoria({ dataSearch = "" }) {
      if (dataSearch === "")
        return;
      const { user, loggedIn, token } = await useJwtAuth();
      try {
        const response = await $fetch(`${APIURL}/categorias/${dataSearch}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        });
        this.count_reaload++;
        return response;
      } catch (error) {
        if (error) {
          console.error("Error al enviar datos:", error);
        }
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "crearCategoria",
  __ssrInlineRender: true,
  props: {
    modoSeleccion: {
      type: Boolean,
      default: false,
      required: false
    },
    inyeccionCategoria: {
      type: Array
    }
  },
  emits: ["selectedCategorias"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
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
    const storeCategoria = useCategoriaStore();
    const dataToSend = ref({
      name: ""
    });
    const DB_categoria = ref({
      data: [{ id: 0, name: "" }],
      data_search: ""
    });
    async function component_obtenerCategoria({ data_search = "" }) {
      DB_categoria.value.data = await storeCategoria.obtenerCategoria({ dataSearch: data_search });
    }
    async function component_storeEliminarCategoria(dataSearch, nombreCategoria) {
      const resultado = confirm(`\xBFDeseas continuar y eliminar ${nombreCategoria} ?`);
      if (!resultado)
        return;
      const result = await storeCategoria.EliminarCategoria({ dataSearch });
      console.log(result);
    }
    watch(() => storeCategoria.count_reaload, () => {
      setTimeout(() => {
        component_obtenerCategoria({});
      }, 500);
    });
    watch(() => props.inyeccionCategoria, () => {
      var _a, _b;
      if (props.inyeccionCategoria && ((_a = props.inyeccionCategoria) == null ? void 0 : _a.length) <= 0) {
        console.log(props.inyeccionCategoria);
        selectedCategories.value = props.inyeccionCategoria;
      }
      if (props.inyeccionCategoria && ((_b = props.inyeccionCategoria) == null ? void 0 : _b.length) > 0) {
        console.log(props.inyeccionCategoria);
        selectedCategories.value = props.inyeccionCategoria;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$1;
      const _component_TransitionFade = __nuxt_component_2;
      _push(`<!--[-->`);
      if (!props.modoSeleccion) {
        _push(`<form action=""><div class="max-w-2xl flex flex-col gap-2 mx-auto"><p class="text-primary-content bg-primary rounded-box text-center font-bold">CREAR CATEGORIA</p><div class="flex flex-col items-center"><label class="input w-full input-bordered flex items-center gap-2"><div class="text-primary">Nombre</div><input${ssrRenderAttr("value", unref(dataToSend).name)} type="text" class="grow" placeholder="Nombre CATEGORIA"></label></div><button class="btn btn-md max-w-20 btn-accent mx-auto">Crear</button></div></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<label class="input input-bordered flex items-center my-2"><input${ssrRenderAttr("value", unref(DB_categoria).data_search)} type="text" class="grow" placeholder="Search">`);
      _push(ssrRenderComponent(_component_Icon, { name: "ic:baseline-search" }, null, _parent));
      _push(`</label><hr>`);
      _push(ssrRenderComponent(_component_TransitionFade, {
        group: "",
        class: "flex flex-wrap justify-center gap-2 my-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(DB_categoria).data, (categoria, index) => {
              _push2(`<div class="${ssrRenderClass([[
                { "bg-green-600 text-white": unref(selectedCategories).includes(categoria.id) },
                { "hover:cursor-pointer": props.modoSeleccion }
              ], "hover:border-primary border-2 rounded-md p-2 relative"])}"${_scopeId}>${ssrInterpolate(categoria.name)} `);
              if (!props.modoSeleccion) {
                _push2(ssrRenderComponent(_component_Icon, {
                  onClick: ($event) => component_storeEliminarCategoria(`${categoria.id}`, categoria.name),
                  class: "absolute -top-2 -right-2 text-red-300 hover:text-red-500 hover:cursor-pointer",
                  size: "20",
                  name: "fa:close"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(DB_categoria).data, (categoria, index) => {
                return openBlock(), createBlock("div", {
                  key: categoria.id,
                  class: [[
                    { "bg-green-600 text-white": unref(selectedCategories).includes(categoria.id) },
                    { "hover:cursor-pointer": props.modoSeleccion }
                  ], "hover:border-primary border-2 rounded-md p-2 relative"],
                  onClick: ($event) => toggleCategorySelection(categoria.id)
                }, [
                  createTextVNode(toDisplayString(categoria.name) + " ", 1),
                  !props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    onClick: withModifiers(($event) => component_storeEliminarCategoria(`${categoria.id}`, categoria.name), ["stop"]),
                    class: "absolute -top-2 -right-2 text-red-300 hover:text-red-500 hover:cursor-pointer",
                    size: "20",
                    name: "fa:close"
                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                ], 10, ["onClick"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ${ssrInterpolate(unref(dataToSend).name)}<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dasboard/categoria/crearCategoria.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=crearCategoria-BJ9s_51C.mjs.map
