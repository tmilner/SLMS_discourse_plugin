import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";

createWidget("slms-calendar-modal", {
  tagName: "div.slms-calendar-panel",

  click(event) {
    let $target = $(event.target);
    let id = $target.data("id");
    if (id == "create") {
      this.container.lookup("controller:composer").open({
        action: Composer.CREATE_TOPIC,
        draftKey: Composer.NEW_TOPIC_KEY,
      });
    }
  },

  html(attrs, state) {
    let buttonHtml = h(
      "li",
      { attributes: { "data-name": "Create" } },
      h("a.widget-link", { attributes: { "data-id": "create" } }, "Create")
    );

    return this.attach("menu-panel", {
      contents: () => [
        h("ul.menu-links.columned", [buttonHtml]),
        h(".clearfix"),
        h("hr"),
      ],
    });
  },

  clickOutside() {
    this.sendWidgetAction("toggleSLMSCalendarWidget");
  },
});
