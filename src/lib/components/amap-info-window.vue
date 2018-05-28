<script>
import { toLngLat } from '../utils/convert-helper';
import registerMixin from '../mixins/register-component';
import { compile, mountedVNode, mountedRenderFn } from '../utils/compile';
export default {
  name: 'el-amap-info-window',
  mixins: [registerMixin],
  props: [
    'vid',
    'isCustom',
    'autoMove',
    'closeWhenClickMap',
    'content',
    'size',
    'offset',
    'position',
    'showShadow',
    'visible',
    'events',
    'template',
    'vnode',
    'contentRender'
  ],
  data() {
    let self = this;
    return {
      withSlots: false,
      propsRedirect: {
        template: 'content',
        vnode: 'content',
        contentRender: 'content'
      },
      converters: {
        template(tpl) {
          const template = compile(tpl, self);
          this.$customContent = template;
          return template.$el;
        },
        vnode(vnode) {
          const _vNode = typeof vnode === 'function' ? vnode(self) : vnode;
          const vNode = mountedVNode(_vNode);
          this.$customContent = vNode;
          return vNode.$el;
        },
        contentRender(renderFn) {
          const template = mountedRenderFn(renderFn, self);
          this.$customContent = template;
          return template.$el;
        }
      },
      handlers: {
        visible(flag) {
          // fixed Amap info-window reopen
          let position = this.getPosition();
          if (position) {
            flag === false ? this.close() : this.open(self.$amap, [position.lng, position.lat]);
          }
        },
        template(node) {
          this.setContent(node);
        }
      }
    };
  },
  destroyed() {
    this.$amapComponent.close();

    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy();
    }
  },
  methods: {
    __initComponent(options) {
      if (this.withSlots) {
        options.content = this.$el;
      }

      // control open / close by visible prop
      delete options.map;

      this.$amapComponent = new AMap.InfoWindow(options);
      if (this.visible !== false) this.$amapComponent.open(this.$amap, toLngLat(this.position));
    }
  },
  render(h) {
    const slots = this.$slots.default || [];
    this.withSlots = !!slots.length;
    if (this.withSlots) {
      return h('div', slots);
    }
    return null;
  }
};
</script>
