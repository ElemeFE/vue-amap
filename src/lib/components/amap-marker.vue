<script>
import registerMixin from '../mixins/register-component';
import { lngLatTo, pixelTo } from '../utils/convert-helper';
import { compile, mountedVNode, mountedRenderFn } from '../utils/compile';
export default {
  name: 'el-amap-marker',
  mixins: [registerMixin],
  props: [
    'vid',
    'position',
    'offset',
    'icon',
    'content',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'animation',
    'shadow',
    'title',
    'clickable',
    'shape',
    'extData',
    'label',
    'events',
    'onceEvents',
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
        shape(options) {
          return new AMap.MarkerShape(options);
        },
        shadow(options) {
          return new AMap.Icon(options);
        },
        template(tpl) {
          return compile(tpl, self);
        },
        vnode(vnode) {
          const _vNode = typeof vnode === 'function' ? vnode(self) : vnode;
          const vNode = mountedVNode(_vNode);
          return vNode;
        },
        contentRender(renderFn) {
          console.log(self);
          const template = mountedRenderFn(renderFn, self);
          return template;
        }
      },
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      if (this.withSlots) {
        options.content = this.$el;
      }
      this.$amapComponent = new AMap.Marker(options);
    },
    $$getExtData() {
      return this.$amapComponent.getExtData();
    },
    $$getPosition() {
      return lngLatTo(this.$amapComponent.getPosition());
    },
    $$getOffset() {
      return pixelTo(this.$amapComponent.getOffset());
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
