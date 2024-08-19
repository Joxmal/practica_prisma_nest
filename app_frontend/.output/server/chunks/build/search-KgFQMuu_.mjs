import { _ as __nuxt_component_2 } from './TransitionFade-g9mVFPqc.mjs';
import _sfc_main$1 from './Icon-CIuK0Lje.mjs';
import { useSSRContext, defineComponent, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, withModifiers, createCommentVNode } from 'vue';
import { d as defineStore } from './server.mjs';
import { u as useJwtAuth } from './composables-TtYWI-F6.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const useAdminCooperadorStore = defineStore("AdminCooperadorStore", {
  state: () => ({
    count_reload: 0,
    DB_cooperadores: []
  }),
  getters: {},
  actions: {
    async crearCooperador({ dataToSend }) {
      const { user, loggedIn, token } = await useJwtAuth();
      const response = await $fetch(`${APIURL}/cooperador`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });
      this.count_reload++;
      return response;
    },
    async optenerCooperador() {
      const { user, loggedIn, token } = await useJwtAuth();
      const response = await $fetch(`${APIURL}/cooperador`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json"
        }
      });
      this.DB_cooperadores = response;
    },
    async eliminarCooperador(id) {
      try {
        const { user, loggedIn, token } = await useJwtAuth();
        const response = await $fetch(`${APIURL}/cooperador${`/${id}`}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  props: {
    modoSeleccion: {
      type: Boolean,
      default: false,
      required: false
    },
    inyeccionCooperador: {
      type: Array
    }
  },
  emits: ["selectedCategorias"],
  setup(__props, { emit: __emit }) {
    const storeCooperador = useAdminCooperadorStore();
    const dataCooperadores_DB = ref([]);
    async function component_obtenerCooperador() {
      try {
        await storeCooperador.optenerCooperador();
        dataCooperadores_DB.value = storeCooperador.DB_cooperadores;
      } catch (error) {
        console.error("Error al obtener cooperadores:", error);
      }
    }
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
    async function component_storeEliminarCategoria(id, nombreCategoria) {
      const resultado = confirm(`\xBFDeseas continuar y eliminar ${nombreCategoria} ?`);
      if (!resultado)
        return;
      await storeCooperador.eliminarCooperador(id);
      component_obtenerCooperador();
    }
    watch(() => storeCooperador.count_reload, () => {
      setTimeout(() => {
        component_obtenerCooperador();
      }, 500);
    });
    watch(() => props.inyeccionCooperador, () => {
      var _a, _b;
      console.log(props.inyeccionCooperador);
      if (props.inyeccionCooperador && ((_a = props.inyeccionCooperador) == null ? void 0 : _a.length) <= 0) {
        console.log("props.inyeccionCooperador", props.inyeccionCooperador);
        selectedCategories.value = props.inyeccionCooperador;
      }
      if (props.inyeccionCooperador && ((_b = props.inyeccionCooperador) == null ? void 0 : _b.length) > 0) {
        console.log("props.inyeccionCooperador", props.inyeccionCooperador);
        selectedCategories.value = props.inyeccionCooperador;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TransitionFade = __nuxt_component_2;
      const _component_Icon = _sfc_main$1;
      _push(ssrRenderComponent(_component_TransitionFade, mergeProps({
        group: "",
        class: "flex flex-wrap justify-center gap-2 my-4"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(dataCooperadores_DB), (cooperador, index) => {
              _push2(`<div class="${ssrRenderClass([[
                { "bg-green-600 text-white": unref(selectedCategories).includes(cooperador.id) },
                { "hover:cursor-pointer": props.modoSeleccion }
              ], "hover:border-primary border-2 rounded-md p-2 relative"])}"${_scopeId}>${ssrInterpolate(cooperador.nombre)} `);
              if (!props.modoSeleccion) {
                _push2(ssrRenderComponent(_component_Icon, {
                  onClick: ($event) => component_storeEliminarCategoria(+cooperador.id, cooperador.nombre),
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(dataCooperadores_DB), (cooperador, index) => {
                return openBlock(), createBlock("div", {
                  key: cooperador.id,
                  class: [[
                    { "bg-green-600 text-white": unref(selectedCategories).includes(cooperador.id) },
                    { "hover:cursor-pointer": props.modoSeleccion }
                  ], "hover:border-primary border-2 rounded-md p-2 relative"],
                  onClick: ($event) => toggleCategorySelection(cooperador.id)
                }, [
                  createTextVNode(toDisplayString(cooperador.nombre) + " ", 1),
                  !props.modoSeleccion ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    onClick: withModifiers(($event) => component_storeEliminarCategoria(+cooperador.id, cooperador.nombre), ["stop"]),
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/cooperador/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useAdminCooperadorStore as u };
//# sourceMappingURL=search-KgFQMuu_.mjs.map
