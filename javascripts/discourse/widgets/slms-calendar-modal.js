import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import hbs from "discourse/widgets/hbs-compiler";

createWidget("slms-booking-date-picker", {
  tagName: "div.slms-booking-data-picker",
  template: hbs`<h1>HI!!</h1>`,
});
/* <DateTimeInputRange
  @toTimeFirst={{true}}
  @clearable={{true}}
  @onChange={{action "changeSLMSBookingDates"}}
/> */
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

  html(attrs, state) {
    let buttonHtml = h(
      "li",
      { attributes: { "data-name": "Create" } },
      h("a.widget-link", { attributes: { "data-id": "create" } }, "Create")
    );

    let contents = [h("h1", "Create Space Booking")];
    contents.push([this.attach("slms-booking-date-picker")]);
    contents.push(buttonHtml);

    return this.attach("menu-panel", {
      contents: () => contents
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
