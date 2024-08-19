import { A as Autoplay, E as EffectCreative, N as Navigation, S as Swiper2, a as SwiperSlide } from './entry-styles-3.mjs-ZOO-Zy7H.mjs';
import { useSSRContext, defineComponent, resolveDirective, unref, withCtx, mergeProps, withDirectives, createVNode, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrGetDirectiveProps, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "basic",
  __ssrInlineRender: true,
  props: {
    images: {
      type: Array,
      default: [
        "https://th.bing.com/th/id/OIP.PUKoIDMPwtgUl9SBCil-mwHaG1?rs=1&pid=ImgDetMain",
        "https://ultimasnoticias.com.ve/wp-content/uploads/2021/11/IMG_27112021_152148_768_x_573_pixel.jpg",
        "https://th.bing.com/th/id/OIP.kylTA--ySRdeWPskGKH7WwHaEK?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.3nwtc4DKMx5CK-84VY4tTQHaFj?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/OIP.3nwtc4DKMx5CK-84VY4tTQHaFj?rs=1&pid=ImgDetMain"
      ]
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_swiper = Swiper2;
      const _component_swiper_slide = SwiperSlide;
      const _directive_lazy_load = resolveDirective("lazy-load");
      let _temp0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-9cc9b9f4>`);
      _push(ssrRenderComponent(_component_swiper, {
        class: "black-slider border h-80 cursor-pointer rounded-xl",
        modules: [unref(Autoplay), unref(EffectCreative), unref(Navigation)],
        lazy: true,
        breakpoints: {
          640: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 2
          }
        },
        navigation: {
          enabled: true
        },
        autoplay: {
          delay: 3e3,
          disableOnInteraction: true
        },
        effect: "creative",
        loop: true,
        "creative-effect": {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1]
          },
          next: {
            translate: ["100%", 0, 0]
          }
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.images, (image, index) => {
              _push2(ssrRenderComponent(_component_swiper_slide, {
                class: "glass h-full",
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a;
                  if (_push3) {
                    _push3(`<img v-lazy-load ${ssrRenderAttrs(_temp0 = mergeProps({
                      class: "object-contain h-full w-full",
                      "data-src": image,
                      alt: "Imagen"
                    }, ssrGetDirectiveProps(_ctx, _directive_lazy_load)))} data-v-9cc9b9f4${_scopeId2}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}<div class="swiper-lazy-preloader swiper-lazy-preloader-white" data-v-9cc9b9f4${_scopeId2}></div>`);
                  } else {
                    return [
                      withDirectives(createVNode("img", {
                        class: "object-contain h-full w-full",
                        "data-src": image,
                        alt: "Imagen"
                      }, null, 8, ["data-src"]), [
                        [_directive_lazy_load]
                      ]),
                      createVNode("div", { class: "swiper-lazy-preloader swiper-lazy-preloader-white" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.images, (image, index) => {
                return openBlock(), createBlock(_component_swiper_slide, {
                  class: "glass h-full",
                  key: index
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode("img", {
                      class: "object-contain h-full w-full",
                      "data-src": image,
                      alt: "Imagen"
                    }, null, 8, ["data-src"]), [
                      [_directive_lazy_load]
                    ]),
                    createVNode("div", { class: "swiper-lazy-preloader swiper-lazy-preloader-white" })
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carrusel/basic.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9cc9b9f4"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=basic-BGdgPt11.mjs.map
