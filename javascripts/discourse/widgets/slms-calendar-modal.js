import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { hbs } from "ember-cli-htmlbars";
import RenderGlimmer from "discourse/widgets/render-glimmer";

createWidget("slms-booking-modal", {
  tagName: "div.slms-booking-panel",
  buildKey: () => "create_booking",

  defaultState() {
    return { start: null, end: null };
  },

  click(event) {
    let $target = $(event.target);
    let id = $target.data("id");

    if (id == "create") {
      this.sendWidgetAction("submitSLMSBookingWidget");
    }
  },

  renderDatePicker() {
    return new RenderGlimmer(
      this,
      "span",
      hbs`<DateTimeInputRange
      @toTimeFirst={{true}}
      @clearable={{true}}
      @onChange={{action "changeSLMSBookingDates"}}
    />`,
      {}
    );
  },

  html(attrs, state) {
    let buttonHtml = h(
      "li",
      { attributes: { "data-name": "Create" } },
      h("a.widget-link", { attributes: { "data-id": "create" } }, "Create")
    );

    let contents = [h("h3", "Create Space Booking")];
    contents.push(h("hr"));
    contents.push([this.renderDatePicker()]);
    contents.push(buttonHtml);

    return this.attach("menu-panel", {
      contents: () => contents,
    });
  },

  // changeSLMSBookingDates(changes) {
  //   this.state.start = changes.from;
  //   this.state.ends = changes.to;
  // },

  clickOutside() {
    this.sendWidgetAction("toggleSLMSBookingWidget");
  },
});
