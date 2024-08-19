import { computed } from 'vue';
import { g as useState } from './server.mjs';

function useJwtAuth() {
  const data = useState("data");
  const token = computed(() => {
    var _a;
    return (_a = data.value) == null ? void 0 : _a.token;
  });
  const user = computed(() => {
    var _a;
    return (_a = data.value) == null ? void 0 : _a.user;
  });
  const loggedIn = computed(() => !!data.value);
  const headers = computed(() => loggedIn.value ? {
    Accept: "application/json",
    Authorization: "Bearer " + data.value.token
  } : { Accept: "application/json" });
  return {
    token,
    user,
    loggedIn,
    headers: headers.value
  };
}

export { useJwtAuth as u };
//# sourceMappingURL=composables-TtYWI-F6.mjs.map
