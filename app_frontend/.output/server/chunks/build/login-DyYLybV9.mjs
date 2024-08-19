import _sfc_main$2 from './Icon-CIuK0Lje.mjs';
import { useSSRContext, ref, unref, defineComponent, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { a as useNuxtApp, b as useRouter$1 } from './server.mjs';
import { A as APIURL } from './apiUrl-8UAdR0AJ.mjs';
import './IconTw-CfM8SxUn.mjs';
import './IconSvg-CeYqyohg.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  emits: ["dataLogin"],
  setup(__props, { emit: __emit }) {
    const loginData = ref({
      user: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg" }, _attrs))}><h1 class="text-3xl font-semibold text-center text-gray-700"> INICIAR SESION </h1><form class="space-y-4"><div><label class="label"><span class="text-base label-text">USUARIO</span></label><input${ssrRenderAttr("value", unref(loginData).user)} type="text" placeholder="Usuario" class="w-full input input-bordered"></div><div><label class="label"><span class="text-base label-text">CONTRASE\xD1A</span></label><input${ssrRenderAttr("value", unref(loginData).password)} type="password" placeholder="Contrase\xF1a" class="w-full input input-bordered"></div><a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a><div><button class="btn btn-block btn-neutral">Login</button></div></form></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { $jwtAuth } = useNuxtApp();
    ref();
    const invalidSession = ref(false);
    async function loginExternal(dataLogin) {
      try {
        const response = await $fetch(`${APIURL}/auth`, {
          method: "post",
          body: {
            name: dataLogin.user,
            password: dataLogin.password
          }
        });
        console.log(response);
        $jwtAuth.setTokenAndUser(
          {
            token: response.token,
            user: response.user
          }
        );
        useRouter$1().push("/admin/dasboard");
      } catch (error) {
        invalidSession.value = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$2;
      const _component_AdminLogin = _sfc_main$1;
      _push(`<!--[--><div class="flex text-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "uim:key-skeleton",
        size: "40"
      }, null, _parent));
      _push(`<p class="text-red-500" style="${ssrRenderStyle(unref(invalidSession) ? null : { display: "none" })}"> Error al iniciar session </p></div><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_AdminLogin, { onDataLogin: loginExternal }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-DyYLybV9.mjs.map
