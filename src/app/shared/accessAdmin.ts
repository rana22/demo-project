export class AdminAccess {

  public checkAdminAccess(userDAO, apiHelper, router) {

    let canAccessAdmin:boolean = false;

    let currentUser = userDAO.getCurrentUser();

    for (let role of currentUser.roles) {
      if (role.adminAccess) {
        canAccessAdmin = true;
        break;
      }
    }

    if (!canAccessAdmin) {
      let apiError = {status: 403, url: router.url};
      apiHelper.handleApiError(apiError);
    }
  }

}
