import { t as defineNuxtRouteMiddleware, v as useCookie, a as useNuxtApp, x as executeAsync, y as useRouter } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';

const jwt_auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const cookieName = "nuxt-jwt-auth-token";
  const cookie = useCookie(cookieName);
  if (cookie.value) {
    const token = cookie.value.token;
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.error(tokenParts);
      console.error("Token JWT no v\xE1lido");
      return;
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    const exp = payload.exp;
    const currentTime = Math.floor(Date.now() / 1e3);
    if (currentTime >= exp) {
      const { $jwtAuth } = useNuxtApp();
      [__temp, __restore] = executeAsync(() => $jwtAuth.logout()), await __temp, __restore();
      [__temp, __restore] = executeAsync(() => useRouter().push("/admin/login")), await __temp, __restore();
      console.log("el token ha expirado.");
    }
  }
});

export { jwt_auth as default };
//# sourceMappingURL=jwt_auth-Bdt4k9h6.mjs.map
