import eventHelper from '../utils/event-helper';
export default {
  methods: {
    setEditorEvents() {
      if (!this.events) return;
      let filters = ['addnode', 'adjust', 'removenode', 'end', 'move'];
      let filterSet = {};
      Object.keys(this.events).forEach(key => {
        if (filters.indexOf(key)) filterSet[key] = this.events[key];
      });
      Object.keys(filterSet).forEach(key => {
        eventHelper.addListener(this.$amapComponent.editor, key, filterSet[key]);
        // this.$amapComponent.editor.on(key, filterSet[key]);
      });
    }
  }
};
