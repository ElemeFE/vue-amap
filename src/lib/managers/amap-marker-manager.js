export default class MarkerManager {
  constructor() {
    this.map = null;
    this.offset = null;
    this.position = null;
    this.label = null;
    this.icon = null;
    this.content = null;
    this.shadow = null;
    this.shape = null;
    this.extData = null;
    this.angle = 0;
    this.zIndex = 0;
    this.clickable = false;
    this.draggable = false;
    this.top = false;
    this.animation = '';
    this.cursor = '';
    this.title = '';
  }
};
