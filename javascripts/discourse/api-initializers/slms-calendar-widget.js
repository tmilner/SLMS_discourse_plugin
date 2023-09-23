import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import { getOwner } from "discourse-common/lib/get-owner";
import Composer from "discourse/models/composer";

export default apiInitializer("0.1", (api) => {
  console.log("SLMS Init")
  // If login is required
  if (settings.require_login && !api.getCurrentUser()) {
    return;
  }

  console.log("SLMS Init 1")

  // If a trust level is required
  if (User.currentProp("trust_level") < settings.minimum_trust_level) {
    return;
  }

  // If user must be staff
  if (settings.require_staff && !api.getCurrentUser().staff) {
    return;
  }

  // If user must be a group member
  if (settings.required_groups.length > 0) {
    const requiredGroups = settings.required_groups
      .split("|")
      .map((g) => Number(g));

    const currentUserGroups = api.getCurrentUser().groups.map((g) => g.id);

    if (!currentUserGroups.some((g) => requiredGroups.includes(g))) {
      return;
    }
  }

  api.decorateWidget("header-icons:before", (helper) => {
    const headerState = helper.widget.parentWidget.state;
    return helper.attach("header-dropdown", {
      title: themePrefix("slms_calendar_widget.title"),
      icon: "calendar-alt",
      active: headerState.slmsCalendarWidgetVisible,
      action: "toggleSLMSCalendarWidget",
    });
  });

  api.decorateWidget("header-icons:after", (helper) => {
    const headerState = helper.widget.parentWidget.state;
    if (headerState.slmsCalendarWidgetVisible) {
      return [helper.attach("slms-calendar-modal")];
    }
  });

  api.attachWidgetAction("slms-calendar-modal", "submitSLMSCalendarWidget", function(){
    const currentUser = getOwner(this).lookup("current-user:main");
    if (!currentUser) {
      showModal("login");
      return;
    }

    getOwner(this).lookup("controller:composer").open({
      action: Composer.CREATE_TOPIC,
      draftKey: "new_topic",
    });
  });

  api.attachWidgetAction("header", "toggleSLMSCalendarWidget", function () {
    this.state.slmsCalendarWidgetVisible = !this.state.slmsCalendarWidgetVisible;
  });
});
