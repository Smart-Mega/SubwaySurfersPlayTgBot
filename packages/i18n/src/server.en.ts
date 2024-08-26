const SERVER_MSG_EN = {
  ADMIN_NOT_FOUND: "No matching administrator found.",

  ACCOUNT_INACTIVE: "Your account is currently inactive. Please contact the system administrator.",

  EMAIL_ALREADY_IN_USE: "This email address is already in use. Please use a different email.",

  INVALID_CREDENTIALS: "Invalid credentials provided. Please check your credentials and try again.",

  LOGIN_SUCCESS: "You've successfully logged in.",
  LOGOUT_SUCCESS: "You've been successfully logged out.",

  PROFILE_UPDATE_SUCCESS:
    "Your profile has been successfully updated. All changes have been saved.",

  REFRESH_TOKEN_MISSING: "Refresh token missing. Please log in again to continue.",
  REFRESH_TOKEN_INVALID:
    "Invalid refresh token detected. Please re-authenticate to continue your session.",

  SOMETHING_WENT_WRONG:
    "Oops! Something went wrong. We're sorry for the inconvenience. Please try again later, or contact our support team if the problem persists.",

  TOKEN_REFRESH_SUCCESS: "Token refreshed successfully. You're all set to continue!",

  USER_ARCHIVE_SUCCESS: "The user has been successfully archived.",
  USERS_FETCH_SUCCESS: "All users information has been successfully fetched.",
  USER_NOT_FOUND: "No matching user found.",
  USER_RESTORE_SUCCESS: "The user has been successfully restored.",

  // BOT
  BOT_ALLIANCES_FETCH_SUCCESS: "All alliances information has been successfully fetched.",
  BOT_ALLIANCES_CREATE_SUCCESS: "New alliance is successfully created",
  BOT_ALLIANCES_MEMBER_ALREADY_JOINED: 'You have already joined this alliance',
  BOT_CHAT_NOT_FOUND: "Chat not found",
  BOT_CHAT_INVALID_MEMBER: "You are not member of chat",
  BOT_LEADERS_FETCH_SUCCESS: "All leaders information has been successfully fetched.",

  BOT_ROBOT_SET_ITEM_REMOVED_SUCCESS: "Item has been successfully removed from the robot.",
  BOT_ROBOT_SET_ITEM_REPLACED_SUCCESS: "Item has been successfully replaced from the robot.",
  BOT_ROBOT_SET_ITEM_PUT_SUCCESS: "Item has been successfully put to the robot.",
  BOT_ROBOT_SET_ITEM_FAILED: "You've failed to setting item to the robot. Please try again later.",

  BOT_SHOP_GET_ROBOTS_SUCCESS: "Robots in sale are successfully fetched.",
  BOT_SHOP_GET_ITEMS_SUCCESS: "Items in sale are successfully fetched.",

  BOT_USER_AUTHENTICATE_SUCCESS: "User authenticated successfully.",
  BOT_USER_JOIN_ALLIANCE_FAILED: "You've failed to joining the alliance. Please try again later.",
  BOT_USER_JOIN_ALLIANCE_SUCCESS: "You've joined the alliance successfully.",
  BOT_USER_JOIN_ALLIANCE_WITH_LEADER_REJECT:
    "You can't join other alliance, because you're a leader in the current alliance.",
  BOT_USER_LEAVE_ALLIANCE_WITHOUT_ALLIANCE_REJECT: "You didn't join any alliance to leave.",
  BOT_USER_LEAVE_ALLIANCE_WITH_LEADER_REJECT:
    "You can't leave the current alliance, because you're a leader in the current alliance.",
  BOT_USER_LEAVE_ALLIANCE_FAILED: "You've failed to leaving the alliance. Please try again later.",
  BOT_USER_LEAVE_ALLIANCE_SUCCESS: "You've left the alliance successfully.",
  BOT_USER_NOT_FOUND: "No matching user found.",

  BOT_TASKS_GET_SUCCESS: "Tasks are successfully fetched",
  BOT_TASKS_COMPLETED_SUCCESS: "Task is completed successfully",
  BOT_TASKS_COMPLETE_FAILED: "To complete task is failed",
  BOT_TASKS_ALREADY_COMPLETED: "Task is already completed",
}

export default SERVER_MSG_EN
