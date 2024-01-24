import { ActionType, ViewOpenType } from '@/constant';
import { ActionCallButtonModel, ActionLoadModel } from '@/constant/model';
import useNavigateTabStore from '@/store/modules/navigate-tab';

export function userOpenView() {
  // const x = ref(0);
  // const y = ref(0);

  // function update(e) {
  //   x.value = e.pageX;
  //   y.value = e.pageY;
  // }

  // onMounted(() => {
  //   window.addEventListener('mousemove', update);
  // });

  // onUnmounted(() => {
  //   window.removeEventListener('mousemove', update);
  // });
  const navigateTabStore = useNavigateTabStore();
  // return { x, y };
  function openNewView(
    action: any,
    actionContext: object = null,
    viewItemService?: any,
    changeToNewTab = true,
    callback?,
    recordId?: number,
    recordIds?: number[]
  ): void {
    switch (action.type) {
      //  case ActionType.Iframe:
      //   this.openDialog(action);
      //   break;

      // case ActionType.Link:
      // case ActionType.Url:
      //   window.open(`${action.url}`);
      //   break;
      // case ActionType.Report:
      //   this.printReport(viewItemService, action, actionContext, callback, recordId, recordIds);
      //   if (viewItemService) {
      //     viewItemService.reload();
      //   }
      //   break;
      case ActionType.New:
      case ActionType.Server:
        if ([ViewOpenType.Dialog].includes(action.target)) {
          // this.openDialogFromAction(action, actionContext, viewItemService);
        } else {
          // if (viewItemService) {
          //   const isDialogModel = viewItemService.checkIsDialogMode();
          //   if (isDialogModel) {
          //     this.closeDialog();
          //   } else {
          //     viewItemService.reload();
          //   }
          // }
          const componentOptions = {
            ..._combineComponentOptions(action, actionContext),
            parentService: viewItemService,
          };
          navigateTabStore.createTab({
            tabTitle: action.name,
            componentOptions,
            changeToNewTab,
          });
          // this.tabsService.createTab<MainComponent>(
          //   action.name,
          //   MainComponent,
          //   componentOptions,
          //   changeToNewTab
          // );
        }
        break;
      // case ActionType.Binary:
      //   this.openSidebarAttachment(action);
      //   break;
      default:
        console.warn("Action haven't correct type!");
        break;
    }
  }

  function _combineComponentOptions(
    action: ActionLoadModel | ActionCallButtonModel,
    parentContext: object
  ): object {
    const componentOptions = { ...action };
    if (action.resId) {
      componentOptions.recordId = action.resId;
    }
    if (parentContext) {
      componentOptions.parentContext = parentContext;
    }
    return componentOptions;
  }

  return { openNewView };
}
