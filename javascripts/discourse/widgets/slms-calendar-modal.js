import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import { hbs } from "ember-cli-htmlbars";

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

    return this.attach("menu-panel", {
      contents: () => [
        h("div.picker", [
          hbs`<DateTimeInputRange
                @from={{startsAt}}
                @to={{endsAt}}
                @toTimeFirst={{true}}
                @clearable={{true}}
                @timezone="Europe/London"
                @onChange={{changeSLMSBookingDates}}
              />`,
          buttonHtml,
        ]),
      ],
    });
  },

  changeSLMSBookingDates(changes) {
    this.state.start = changes.from;
    this.state.ends = changes.to;
  },

  clickOutside() {
    this.sendWidgetAction("toggleSLMSBookingWidget");
  },
});
