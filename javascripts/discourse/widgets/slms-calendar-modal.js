import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";
import panelMessage from "../lib/panel-message";
import getTheme from "../lib/theme";
import DiscourseURL from "discourse/lib/url";

createWidget("slms-calendar-modal", {
  tagName: "div.slms-calendar-panel",

  html() {
      return this.attach("menu-panel", {
        contents: () =>
          panelMessage(
            "warning",
            "slms_calendar_widget.temp_msg",
            "exclamation-triangle"
          ),
      });
    
  },

  clickOutside() {
    this.sendWidgetAction("toggleSLMSCalendarWidget");
  },
});
