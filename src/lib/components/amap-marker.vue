<script>
import registerMixin from '../mixins/register-component';
import {
  lngLatTo,
  pixelTo,
  toPixel
} from '../utils/convert-helper';

import {
  compile,
  mountedVNode,
  mountedRenderFn
} from '../utils/compile';
import Vue from 'vue';

const TAG = 'el-amap-marker';

export default {
  name: TAG,
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
      $tagName: TAG,
      withSlots: false,
      tmpVM: null,
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
        },
        label(options) {
          const { content = '', offset = [0, 0] } = options;
          return {
            content: content,
            offset: toPixel(offset)
          };
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
  created() {
    this.tmpVM = new Vue({
      data() {
        return {node: ''};
      },
      render(h) {
        const {node} = this;
        return h('div', {ref: 'node'}, Array.isArray(node) ? node : [node]);
      }
    }).$mount();
  },
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length) {
        options.content = this.tmpVM.$refs.node;
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
    if (slots.length) {
      this.tmpVM.node = slots;
    }
    return null;
  },
  destroyed() {
    this.tmpVM.$destroy();
    if (this.$customContent && this.$customContent.$destroy) {
      this.$customContent.$destroy();
    }
  }
};
</script>
